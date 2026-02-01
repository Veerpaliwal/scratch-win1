"use client";

import { useState } from "react";

export default function TestPage() {
  const [customers, setCustomers] = useState([]);
  const [newName, setNewName] = useState("");

  async function loadCustomers() {
    const res = await fetch("/api/customer");
    const data = await res.json();
    setCustomers(data);
  }

  async function addCustomer() {
    await fetch("/api/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: "ABC Pvt Ltd",
        fullname: newName || "Rahul Sharma",
        phoneno: "9876543210",
        address: "Delhi",
        pincode: "110001",
      }),
    });
    setNewName("");
    loadCustomers();
  }

  async function deleteCustomer(id) {
    await fetch("/api/customer", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadCustomers();
  }

  async function updateCustomer(id) {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;

    await fetch("/api/customer", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        company: "ABC Pvt Ltd",
        fullname: updatedName,
        phoneno: "9876543210",
        address: "Delhi",
        pincode: "110001",
      }),
    });
    loadCustomers();
  }

  return (
    <div style={{
      padding: 30,
      maxWidth: 500,
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>SQLite3 CRUD Test</h2>

      <div style={{ display: "flex", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Customer Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 5,
            border: "1px solid #ccc",
            marginRight: 10,
            fontSize: 14
          }}
        />
        <button
          onClick={addCustomer}
          style={{
            padding: "8px 12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            fontSize: 14
          }}
        >
          Add
        </button>
        <button
          onClick={loadCustomers}
          style={{
            padding: "8px 12px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            fontSize: 14,
            marginLeft: 5
          }}
        >
          Load
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {customers.map((c) => (
          <li key={c.id} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            padding: 10,
            borderRadius: 5,
            marginBottom: 8,
          }}>
            <span>{c.fullname} – {c.phoneno}</span>
            <div>
              <button
                onClick={() => updateCustomer(c.id)}
                style={{
                  padding: "4px 8px",
                  marginRight: 5,
                  backgroundColor: "#FFC107",
                  color: "#333",
                  border: "none",
                  borderRadius: 3,
                  cursor: "pointer",
                  fontSize: 12
                }}
              >
                Update
              </button>
              <button
                onClick={() => deleteCustomer(c.id)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "#F44336",
                  color: "white",
                  border: "none",
                  borderRadius: 3,
                  cursor: "pointer",
                  fontSize: 12
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
