"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    company: "",
    fullname: "",
    phoneno: "",
    aadhar: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/scratch?product=${formData.company}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles["glass-card"]}>
        <h2>Scratch & Win</h2>

        <form onSubmit={handleSubmit}>
          <label>Product Company</label>
          <select name="company" onChange={handleChange}>
            <option value="">Select</option>
            <option value="MI">MI</option>
            <option value="SAMSUNG">Samsung</option>
            <option value="LG">LG</option>
            <option value="IFFALCON">IFFALCON</option>
            <option value="TCL">TCL</option>
            <option value="WHIRLPOOL">WHIRLPOOL</option>
            <option value="VOLTAS">VOLTAS</option>
            <option value="HAIER">HAIER</option>
            <option value="BAJAJ">BAJAJ</option>
            <option value="HAVELLS">HAVELLS</option>
          </select>

          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="Enter your name"
            onChange={handleChange}
          />

          <label>Phone No.</label>
          <input
            type="text"
            name="phoneno"
            placeholder="Enter phone no."
            onChange={handleChange}
          />

          <label>Aadhar Number</label>
          <input
            type="text"
            name="aadhar"
            placeholder="Enter aadhar"
            onChange={handleChange}
          />

          <button type="submit">🎉 Scratch Now!</button>
        </form>
      </div>
    </div>
  );
}
