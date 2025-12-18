"use client"

import { useState } from "react"
import { registerUser } from "../api/authApi"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit() {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields")
      return
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long")
      return
    }

    setLoading(true)
    try {
      const res = await registerUser(form)
      if (res.message && !res.error) {
        alert(res.message)
        navigate("/login") // Redirect to login after successful registration
      } else {
        alert(res.error || "Registration failed")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: "linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)",
    },
    card: {
      width: "100%",
      maxWidth: "450px",
      background: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    header: {
      background: "linear-gradient(135deg, #00897b 0%, #00695c 100%)",
      padding: "50px 40px",
      textAlign: "center",
      color: "white",
    },
    icon: {
      fontSize: "4rem",
      marginBottom: "16px",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "800",
      margin: "0 0 8px 0",
    },
    subtitle: {
      fontSize: "0.95rem",
      opacity: "0.9",
      margin: 0,
    },
    formContainer: {
      padding: "40px",
    },
    formGroup: {
      marginBottom: "24px",
    },
    label: {
      display: "block",
      fontSize: "0.9rem",
      fontWeight: "600",
      color: "#333",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      fontSize: "1rem",
      border: "2px solid #e0e0e0",
      borderRadius: "8px",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    validationText: {
      fontSize: "0.75rem",
      color: "#d32f2f",
      marginTop: "4px",
    },
    button: {
      width: "100%",
      padding: "16px",
      fontSize: "1.1rem",
      fontWeight: "700",
      color: "white",
      background: "linear-gradient(135deg, #00897b 0%, #00695c 100%)",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0, 137, 123, 0.3)",
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    linkContainer: {
      marginTop: "24px",
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#666",
    },
    link: {
      color: "#00897b",
      fontWeight: "600",
      textDecoration: "none",
      borderBottom: "2px solid transparent",
      transition: "border-color 0.2s",
    },
    footer: {
      textAlign: "center",
      fontSize: "0.75rem",
      color: "#999",
      marginTop: "20px",
      paddingTop: "20px",
      borderTop: "1px solid #e0e0e0",
    },
    spinner: {
      display: "inline-block",
      width: "16px",
      height: "16px",
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderTop: "3px solid white",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginRight: "8px",
      verticalAlign: "middle",
    },
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        input:focus {
          border-color: #00897b !important;
          box-shadow: 0 0 0 3px rgba(0, 137, 123, 0.1) !important;
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 137, 123, 0.4);
        }
        a:hover {
          border-bottom: 2px solid #00897b !important;
        }
        @media (max-width: 768px) {
          .card { border-radius: 12px; }
          .header { padding: 40px 30px; }
          .form-container { padding: 30px 25px; }
          .title { font-size: 1.75rem; }
        }
        @media (max-width: 480px) {
          .header { padding: 30px 20px; }
          .form-container { padding: 25px 20px; }
          .title { font-size: 1.5rem; }
        }
      `}</style>

      <div style={styles.container}>
        <div style={styles.card} className="card">
          <div style={styles.header} className="header">
            <div style={styles.icon}><img src="/AgriPredict.png" alt="AgriPredict Logo" style={{   height: "100px",   width: "200px",   objectFit: "contain", }} /></div>
            <h2 style={styles.title} className="title">Create Account</h2>
            <p style={styles.subtitle}>Join AgriPredict to get started with smart farming</p>
          </div>

          <div style={styles.formContainer} className="form-container">
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                placeholder="Ram Kumar"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={styles.input}
                disabled={loading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="ram@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={styles.input}
                disabled={loading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Choose a strong password (min 6 characters)"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyPress={(e) => e.key === "Enter" && !loading && submit()}
                style={styles.input}
                disabled={loading}
              />
              {form.password && form.password.length < 6 && (
                <p style={styles.validationText}>
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <button
              onClick={submit}
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading && styles.buttonDisabled),
              }}
            >
              {loading ? (
                <>
                  <span style={styles.spinner}></span>
                  Creating Account...
                </>
              ) : (
                " Register"
              )}
            </button>

            <div style={styles.linkContainer}>
              Already have an account?{" "}
              <Link to="/login" style={styles.link}>
                Login here
              </Link>
            </div>

            <p style={styles.footer}>
              By registering, you agree to AgriPredict's Terms of Service
            </p>
          </div>
        </div>
      </div>
    </>
  )
}