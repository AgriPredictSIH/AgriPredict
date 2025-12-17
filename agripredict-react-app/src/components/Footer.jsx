import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1b5e20", color: "white", padding: "3rem 0", marginTop: "auto" }}>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px" }}
      >
        <div style={{ flex: "1", minWidth: "250px" }}>
          <h3 style={{ color: "white", marginBottom: "12px", fontSize: "1.5rem" }}>AgriPredict</h3>
          <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
            Empowering farmers with AI-driven decisions for sustainable and profitable agriculture.
          </p>
        </div>
        <div style={{ flex: "1", minWidth: "200px" }}>
          <h4 style={{ color: "white", marginBottom: "16px", fontSize: "1.1rem" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <Link to="/" style={{ color: "#a5d6a7", textDecoration: "none", transition: "color 0.2s" }}>
                Home
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link to="/crop" style={{ color: "#a5d6a7", textDecoration: "none", transition: "color 0.2s" }}>
                Crop Recommendation
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link to="/disease" style={{ color: "#a5d6a7", textDecoration: "none", transition: "color 0.2s" }}>
                Disease Detection
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link to="/crop-history" style={{ color: "#a5d6a7", textDecoration: "none", transition: "color 0.2s" }}>
                History
              </Link>
            </li>
          </ul>
        </div>
        <div style={{ flex: "1", minWidth: "200px" }}>
          <h4 style={{ color: "white", marginBottom: "16px", fontSize: "1.1rem" }}>Contact</h4>
          <p style={{ marginBottom: "8px", opacity: 0.9 }}>Team CHAIN X</p>
          <p style={{ marginBottom: "8px", opacity: 0.9 }}>SIH 2025 - ID: SIH25030</p>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          paddingTop: "20px",
        }}
      >
        <small style={{ opacity: 0.8 }}>&copy; {new Date().getFullYear()} AgriPredict. All rights reserved.</small>
      </div>

      <style>{`
        footer a:hover {
          color: white !important;
        }
      `}</style>
    </footer>
  )
}
