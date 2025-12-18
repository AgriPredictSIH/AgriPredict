"use client"

import { useState, useContext } from "react"
import { loginUser } from "../api/authApi"
import { AuthContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  async function submit() {
    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)
    try {
      const res = await loginUser({ email, password })
      if (res.token) {
        login(res.token)
        navigate("/")
      } else {
        alert(res.error || "Login failed")
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
      background: "linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)",
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
      background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
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
    inputFocus: {
      borderColor: "#2e7d32",
      boxShadow: "0 0 0 3px rgba(46, 125, 50, 0.1)",
    },
    button: {
      width: "100%",
      padding: "16px",
      fontSize: "1.1rem",
      fontWeight: "700",
      color: "white",
      background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(46, 125, 50, 0.3)",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(46, 125, 50, 0.4)",
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
      color: "#2e7d32",
      fontWeight: "600",
      textDecoration: "none",
      borderBottom: "2px solid transparent",
      transition: "border-color 0.2s",
    },
    footer: {
      textAlign: "center",
      fontSize: "0.75rem",
      color: "#999",
      marginTop: "24px",
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
          border-color: #2e7d32 !important;
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1) !important;
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
        }
        a:hover {
          border-bottom: 2px solid #2e7d32 !important;
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
            <div style={styles.icon}><img src="/rsz_agripredict_logo.png"alt="AgriPredict Logo"style={{  objectFit: "contain",}}/></div>
            <h2 style={styles.title} className="title">Welcome Back</h2>
            <p style={styles.subtitle}>Login to access your AgriPredict account</p>
          </div>

          <div style={styles.formContainer} className="form-container">
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="farmer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !loading && submit()}
                style={styles.input}
                disabled={loading}
              />
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
                  Logging in...
                </>
              ) : (
                " Login"
              )}
            </button>

            <div style={styles.linkContainer}>
              Don't have an account?{" "}
              <Link to="/register" style={styles.link}>
                Register here
              </Link>
            </div>

            <p style={styles.footer}>
              By continuing, you agree to AgriPredict's Terms of Service
            </p>
          </div>
        </div>
      </div>
    </>
  )
}