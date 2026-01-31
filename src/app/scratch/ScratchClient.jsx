"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Confetti from "react-confetti";
import styles from "./ScratchPage.module.css";

// Product → Logo mapping (add more if needed)
const productLogos = {
  MI: "/logos/mi.png",
  SAMSUNG: "/logos/samsung.png",
  LG: "/logos/lg.png",
  IFFALCON: "/logos/iffalcon.png",
  TCL: "/logos/tcl.png",
  WHIRLPOOL: "/logos/whirlpool.png",
  VOLTAS: "/logos/voltas.png",
  HAIER: "/logos/haier.png",
  BAJAJ: "/logos/bajaj.png",
  HAVELLS: "/logos/havells.png",
};

export default function ScratchClient() {
  const searchParams = useSearchParams();
  const product = (searchParams.get("product") || "PRODUCT").toUpperCase();

  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Unlock audio on first interaction (mobile fix)
  const unlockSound = () => {
    if (audioCtxRef.current) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtxRef.current = new AudioContext();
  };

  const playMoneySound = () => {
    const audioCtx = audioCtxRef.current;
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.7, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  };

  // Responsive canvas
  useEffect(() => {
    const resize = () => {
      const parent = canvasRef.current?.parentElement;
      if (!parent) return;

      const w = parent.offsetWidth;
      const h = parent.offsetHeight;

      setCanvasSize({ width: w, height: h });

      const canvas = canvasRef.current;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      // Metallic / shiny scratch layer
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "#c0c0c0");
      grad.addColorStop(0.4, "#e8e8e8");
      grad.addColorStop(0.6, "#a0a0a0");
      grad.addColorStop(1, "#c0c0c0");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Optional: subtle pattern/noise
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#000";
      for (let i = 0; i < 800; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        ctx.fillRect(x, y, 1.5, 1.5);
      }
      ctx.globalAlpha = 1;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Random discount amount
  useEffect(() => {
    const min = 500;
    const max = 3000;
    const step = 50;
    const val = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
    setAmount(val);
  }, []);

  const scratch = (e) => {
    if (!isDrawing || scratched) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX || e.touches?.[0]?.clientX || 0) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY || 0) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, canvas.width * 0.12, 0, Math.PI * 2);
    ctx.fill();

    // Check how much scratched
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] === 0) transparent++;
    }

    if (transparent > (imgData.data.length / 4) * 0.55) {
      setScratched(true);
      setShowConfetti(true);
      playMoneySound();
      setTimeout(() => setShowConfetti(false), 4500);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Lucky Scratch Coupon</h1>
        <p className={styles.subtitle}>Scratch to reveal your exclusive discount!</p>

        <div className={styles.scratchCard}>
          {!scratched && (
            <>
              <canvas
                ref={canvasRef}
                className={styles.canvas}
                onMouseDown={() => { unlockSound(); setIsDrawing(true); }}
                onMouseUp={() => setIsDrawing(false)}
                onMouseMove={scratch}
                onMouseLeave={() => setIsDrawing(false)}
                onTouchStart={() => { unlockSound(); setIsDrawing(true); }}
                onTouchEnd={() => setIsDrawing(false)}
                onTouchMove={scratch}
              />
              <div className={styles.instruction}>Scratch here → ✨</div>
            </>
          )}

          {scratched && (
            <div className={styles.result}>
              <div className={styles.rewardBox}>
                {productLogos[product] && (
                  <img
                    src={productLogos[product]}
                    alt={`${product} logo`}
                    className={styles.productLogo}
                  />
                )}

                <h2 className={styles.prizeText}>₹{amount} OFF</h2>
                <p className={styles.prizeSub}>on your next {product} purchase!</p>
              </div>
            </div>
          )}

          {showConfetti && (
            <Confetti
              width={canvasSize.width}
              height={canvasSize.height}
              recycle={false}
              numberOfPieces={180}
              gravity={0.15}
            />
          )}
        </div>
      </div>
    </div>
  );
}