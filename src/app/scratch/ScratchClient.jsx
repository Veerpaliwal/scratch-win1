"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Confetti from "react-confetti";
import styles from "./ScratchPage.module.css";

export default function ScratchClient() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") || "PRODUCT";

  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const unlockSound = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
  };

  const playMoneySound = () => {
    const audioCtx = audioCtxRef.current;
    if (!audioCtx) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.6, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + 0.4
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.4);
  };

  // Set responsive canvas size
  useEffect(() => {
    const resizeCanvas = () => {
      const container = canvasRef.current.parentElement;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      setCanvasSize({ width, height });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = "#C0C0C0";
      ctx.fillRect(0, 0, width, height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);

  }, []);

  useEffect(() => {
    const min = 500;
    const max = 3000;
    const step = 50;
    const randomAmount =
      Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
    setAmount(randomAmount);
  }, []);

  const scratch = (e) => {
    if (!isDrawing || scratched) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, canvas.width * 0.06, 0, Math.PI * 2); // radius responsive
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] === 0) cleared++;
    }

    if (cleared > imageData.data.length * 0.5 / 4) {
      setScratched(true);
      setShowConfetti(true);
      playMoneySound();
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2 className={styles.title}>Scratch Coupon</h2>

        <div className={styles.scratchCard}>
          {!scratched && (
            <canvas
              ref={canvasRef}
              className={styles.canvas}
              onMouseDown={() => {
                unlockSound();
                setIsDrawing(true);
              }}
              onMouseUp={() => setIsDrawing(false)}
              onMouseMove={scratch}
              onMouseLeave={() => setIsDrawing(false)}
              onTouchStart={() => {
                unlockSound();
                setIsDrawing(true);
              }}
              onTouchEnd={() => setIsDrawing(false)}
              onTouchMove={scratch}
            />
          )}

          {scratched && (
            <div className={styles.result}>
              <h1>{product}</h1>
              <h2>🎉 You got ₹{amount} off 🎉</h2>
            </div>
          )}

          {showConfetti && (
            <Confetti
              width={canvasSize.width}
              height={canvasSize.height}
              recycle={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
