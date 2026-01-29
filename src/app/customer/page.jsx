"use client";

import "./customer.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    company: "",
    firstName: "",
    lastName: "",
    aadhar: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.company ||
      !formData.firstName ||
      !formData.lastName ||
      formData.aadhar.length !== 12
    ) {
      alert("Fill all details correctly");
      return;
    }

    // ✅ PRODUCT PASS HO RAHA HAI
    router.push(`/scratch?product=${formData.company}`);
  };

  return (
    <div className="page">
      <div className="glass-card">
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

          <label>First Name</label>
          <input type="text" name="firstName" onChange={handleChange} />

          <label>Last Name</label>
          <input type="text" name="lastName" onChange={handleChange} />

          <label>Aadhar Number</label>
          <input
            type="text"
            name="aadhar"
            maxLength={12}
            onChange={handleChange}
          />

          <button type="submit">Scratch Now</button>
        </form>
      </div>
    </div>
  );
}
