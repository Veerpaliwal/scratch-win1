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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: basic validation
    if (!formData.company || !formData.fullname || !formData.phoneno) {
      alert("Please fill Product, Name & Phone number");
      return;
    }

    router.push(`/scratch?product=${encodeURIComponent(formData.company)}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.glassCard}>
          <h1 className={styles.title}>Scratch & Win Exclusive Discount</h1>
          <p className={styles.subtitle}>
            Fill details → Scratch → Get instant offer on your favourite brand!
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Product Company *</label>
              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={styles.input}
                required
              >
                <option value=""></option>
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
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name *</label>
              <input
                type="text"
                name="fullname"
                placeholder=" "
                value={formData.fullname}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Phone Number *</label>
              <input
                type="tel"
                name="phoneno"
                placeholder=" "
                value={formData.phoneno}
                onChange={handleChange}
                className={styles.input}
                pattern="[0-9]{10}"
                maxLength={10}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Address</label>
              <input
                type="text"
                name="address"
                placeholder=" "
                value={formData.address}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Pin Code</label>
              <input
                type="text"
                name="pincode"
                placeholder=" "
                value={formData.pincode}
                onChange={handleChange}
                className={styles.input}
                pattern="[0-9]{6}"
                maxLength={6}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              🎉 Proceed to Scratch
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}