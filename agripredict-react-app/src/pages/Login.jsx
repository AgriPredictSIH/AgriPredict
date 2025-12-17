"use client"

import { useState, useContext } from "react"
import { loginUser } from "../api/authApi"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)

  async function submit() {
    if (!email || !password) return alert("Please fill all fields")
    const res = await loginUser({ email, password })
    if (res.token) login(res.token)
    else alert(res.error || "Login failed")
  }

  return (
    <div
      className="page"
      style={{ background: "linear-gradient(135deg, #f1f8e9 0%, #ffffff 100%)", minHeight: "100vh" }}
    >
      <div
        className="center-box card"
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          border: "1px solid #e1e4e8",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🌾</div>
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
            Welcome Back
          </h2>
          <p style={{ color: "#586069", marginTop: "12px", fontSize: "1.05rem" }}>
            Login to access your AgriPredict account
          </p>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="farmer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          🚀 Login
        </button>

        <p style={{ textAlign: "center", marginTop: "28px", color: "#586069", fontSize: "0.95rem" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
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
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
