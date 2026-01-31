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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.fullname || !formData.phoneno) {
      alert("Please fill Product, Name & Phone number");
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      router.push(`/scratch?product=${encodeURIComponent(formData.company)}`);
    }, 1000);
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
            {/* Product Company */}
            <div className={styles.inputGroup}>
              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={submitted}
              >
                <option value="" hidden>
                  Select Product Company
                </option>
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
                {/* Full Name */}
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                  <label className={styles.label}>Full Name</label>
                </div>

                {/* Phone Number */}
                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    name="phoneno"
                    placeholder="Phone Number"
                    value={formData.phoneno}
                    onChange={handleChange}
                    className={styles.input}
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                  />
                  <label className={styles.label}>Phone Number</label>
                </div>

                {/* Address */}
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

                {/* Pin Code */}
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pin Code"
                    value={formData.pincode}
                    onChange={handleChange}
                    pattern="[0-9]{6}"
                    maxLength={6}
                    className={styles.input}
                  />
                  <label className={styles.label}>Pin Code</label>
                </div>
              </>
            )}

            <button type="submit" className={styles.submitBtn} disabled={submitted}>
              {submitted ? "✅ Details Saved" : "🎉 Proceed to Scratch"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
