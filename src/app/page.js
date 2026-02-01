"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function HomePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    company: "",
    fullname: "",
    phoneno: "",
    address: "",
    pincode: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ❌ NO validation
    setSubmitted(true);

    setTimeout(() => {
      router.push(
        `/scratch?product=${encodeURIComponent(formData.company)}`
      );
    }, 800);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.glassCard}>
          <h1 className={styles.title}>Scratch & Win Exclusive Discount</h1>
          <p className={styles.subtitle}>
            Fill details → Scratch → Get instant offer
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Product Company */}
            <div className={styles.inputGroup}>
              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select Product Company</option>
                <option value="MI">MI / Xiaomi</option>
                <option value="SAMSUNG">Samsung</option>
                <option value="LG">LG</option>
                <option value="IFFALCON">iFFALCON</option>
                <option value="TCL">TCL</option>
                <option value="WHIRLPOOL">Whirlpool</option>
                <option value="VOLTAS">Voltas</option>
                <option value="HAIER">Haier</option>
                <option value="BAJAJ">Bajaj</option>
                <option value="HAVELLS">Havells</option>
              </select>
              <label className={styles.label}>Product Company</label>
            </div>

            {!submitted && (
              <>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <label className={styles.label}>Full Name</label>
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    name="phoneno"
                    placeholder="Phone Number"
                    value={formData.phoneno}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <label className={styles.label}>Phone Number</label>
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <label className={styles.label}>Address</label>
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pin Code"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <label className={styles.label}>Pin Code</label>
                </div>
              </>
            )}

            <button type="submit" className={styles.submitBtn}>
              {submitted ? "✅ Redirecting..." : "🎉 Proceed to Scratch"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}