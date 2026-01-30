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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation rules:
    // - company must be selected
    // - fullname: anything allowed
    // - phoneno: exactly 10 characters (anything)
    // - aadhar: anything
    if (
      !formData.company ||
      !formData.fullname ||
      formData.phoneno.length !== 10 ||
      !formData.aadhar
    ) {
      alert(
        "Fill all details correctly.\nPhone No. must be exactly 10 characters."
      );
      return;
    }

    // Redirect to scratch page with product
    router.push(`/scratch?product=${formData.company}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles["glass-card"]}>
        <h2>Scratch Coupon</h2>

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

          <label>Phone no.</label>
          <input
            type="text"
            name="phoneno"
            placeholder="Enter 10 digit phone no."
            maxLength={10}
            onChange={handleChange}
          />

          <label>Aadhar Number</label>
          <input
            type="text"
            name="aadhar"
            placeholder="Enter aadhar"
            onChange={handleChange}
          />

          <button type="submit">Scratch Now</button>
        </form>
      </div>
    </div>
  );
}
