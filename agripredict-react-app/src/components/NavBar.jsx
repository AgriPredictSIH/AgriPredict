"use client"

import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Navbar() {
  const { token, logout } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinkStyle = {
    color: "#2e7d32",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
    padding: "8px 16px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
  }

  return (
    <nav
      style={{
        background: "white",
        padding: "1rem 0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid #e1e4e8",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/AgriPredict.png"
            alt="AgriPredict Logo"
            style={{
              height: "50px",
              width: "200px",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link to="/" style={navLinkStyle}>
            Home
          </Link>
          <Link to="/crop" style={navLinkStyle}>
            Crop
          </Link>
          <Link to="/disease" style={navLinkStyle}>
            Disease
          </Link>
          <Link to="/crop-history" style={navLinkStyle}>
            History
          </Link>

          {!token ? (
            <>
              <Link to="/login" style={navLinkStyle}>
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  ...navLinkStyle,
                  background: "#2e7d32",
                  color: "white",
                  padding: "8px 20px",
                  marginLeft: "8px",
                  marginRight: "12px",
                }}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              style={{
                margin: "0",          
                marginLeft: "8px",
                marginRight: "18px",
                background: "#d32f2f",
                color: "white",
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            margin: "0",
            display: "none",
            background: "none",
            color: "#2e7d32",
            fontSize: "1.8rem",
            padding: "8px 0px",
            border: "none",
            cursor: "pointer",
            lineHeight: "1",
          }}
          className="mobile-toggle"
        >
          ☰
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        
        .desktop-menu a:hover {
          background: #f5f7fa;
        }
        
        .desktop-menu a[href="/register"]:hover {
          background: #1b5e20;
        }
      `}</style>

      {mobileMenuOpen && (
        <div
          style={{
            background: "white",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            borderTop: "1px solid #e1e4e8",
          }}
        >
          <Link to="/" style={{ ...navLinkStyle, display: "block" }} onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/crop" style={{ ...navLinkStyle, display: "block" }} onClick={() => setMobileMenuOpen(false)}>
            Crop
          </Link>
          <Link to="/disease" style={{ ...navLinkStyle, display: "block" }} onClick={() => setMobileMenuOpen(false)}>
            Disease
          </Link>
          <Link
            to="/crop-history"
            style={{ ...navLinkStyle, display: "block" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            History
          </Link>
          {!token ? (
            <>
              <Link to="/login" style={{ ...navLinkStyle, display: "block" }} onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  ...navLinkStyle,
                  background: "#2e7d32",
                  color: "white",
                  textAlign: "center",
                  display: "block",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout()
                setMobileMenuOpen(false)
              }}
              style={{
                color: "white",
                background: "#d32f2f",
                textAlign: "center",
                padding: "8px 20px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}