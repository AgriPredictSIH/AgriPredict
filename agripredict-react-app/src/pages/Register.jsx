"use client"

import { useState } from "react"
import { registerUser } from "../api/authApi"
import { Link } from "react-router-dom"

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })

  async function submit() {
    if (!form.name || !form.email || !form.password) return alert("Please fill all fields")
    const res = await registerUser(form)
    alert(res.message || res.error)
  }

  return (
    <div
      className="page"
      style={{ background: "linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)", minHeight: "100vh" }}
    >
      <div
        className="center-box card"
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          border: "1px solid #e1e4e8",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🌱</div>
          <h2
            style={{
              width: "100%",
              borderBottom: "none",
              margin: 0,
              fontSize: "2.25rem",
              fontWeight: "800",
              background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Create Account
          </h2>
          <p style={{ color: "#586069", marginTop: "12px", fontSize: "1.05rem" }}>
            Join AgriPredict to get started with smart farming
          </p>
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            placeholder="Ram Kumar"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="ram@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Choose a strong password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyPress={(e) => e.key === "Enter" && submit()}
          />
        </div>

        <button
          onClick={submit}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "1.1rem",
            fontWeight: "700",
            letterSpacing: "0.5px",
          }}
        >
          🎉 Register
        </button>

        <p style={{ textAlign: "center", marginTop: "28px", color: "#586069", fontSize: "0.95rem" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2e7d32",
              fontWeight: "700",
              textDecoration: "none",
              borderBottom: "2px solid transparent",
              transition: "border-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.borderBottom = "2px solid #2e7d32")}
            onMouseOut={(e) => (e.target.style.borderBottom = "2px solid transparent")}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}