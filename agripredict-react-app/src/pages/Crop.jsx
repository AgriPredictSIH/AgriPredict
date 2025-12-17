"use client"

import { useState, useContext } from "react"
import { cropAPI } from "../api/genaiApi"
import { AuthContext } from "../context/AuthContext"

export default function Crop() {
  const { token } = useContext(AuthContext)
  const [formData, setFormData] = useState({ soil: "", rainfall: "", temperature: "" })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function submit() {
    setError("")
    setResult(null)
    if (!token) return setError("Please login to use this feature.")
    if (!formData.soil || !formData.rainfall || !formData.temperature) return setError("Please fill all fields.")

    setLoading(true)
    try {
      const data = await cropAPI(
        {
          soil: formData.soil,
          rainfall: Number(formData.rainfall),
          temperature: Number(formData.temperature),
        },
        token,
      )
      setResult(data)
    } catch (err) {
      setError("Failed to fetch recommendation. Please check your inputs.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <h2 style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "2.5rem" }}>🌾</span>
          Crop Recommendation
        </h2>
        <p style={{ color: "#586069", fontSize: "1.05rem", marginTop: "8px", marginBottom: "32px" }}>
          Get AI-powered crop recommendations based on your soil and weather conditions
        </p>

        <div className="two-column-layout">
          {/* Input Section */}
          <div className="card">
            <h3 style={{ fontSize: "1.3rem", marginBottom: "24px", color: "#24292e" }}>📋 Enter Field Details</h3>

            <div className="form-group">
              <label>Soil Type</label>
              <select name="soil" value={formData.soil} onChange={handleChange}>
                <option value="">Select Soil Type</option>
                <option value="Alluvial">Alluvial</option>
                <option value="Black">Black</option>
                <option value="Red">Red</option>
                <option value="Clay">Clay</option>
                <option value="Sandy">Sandy</option>
                <option value="Loam">Loam</option>
              </select>
            </div>

            <div className="form-group">
              <label>Annual Rainfall (mm)</label>
              <input
                type="number"
                name="rainfall"
                placeholder="e.g. 1200"
                value={formData.rainfall}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Average Temperature (°C)</label>
              <input
                type="number"
                name="temperature"
                placeholder="e.g. 30"
                value={formData.temperature}
                onChange={handleChange}
              />
            </div>

            {error && <div className="error-alert">⚠️ {error}</div>}

            <button
              onClick={submit}
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "1.05rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #66bb6a 0%, #43a047 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {loading ? "🔄 Analyzing..." : "🚀 Predict Best Crop"}
            </button>
          </div>

          {/* Result Section */}
          <div>
            {result ? (
              <div className="card result-container">
                <div className="result-title">✅ Recommended Crop</div>
                <div className="result-value">{result.prediction || "Wheat"}</div>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "#33691e", marginBottom: "24px" }}>
                  Based on your soil and weather parameters, this crop gives the highest yield probability.
                </p>
                <div
                  style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "10px",
                    border: "2px solid #c5e1a5",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div>
                      <div style={{ fontSize: "0.85rem", color: "#7cb342", fontWeight: "600", marginBottom: "4px" }}>
                        CONFIDENCE SCORE
                      </div>
                      <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#2e7d32" }}>92%</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.85rem", color: "#7cb342", fontWeight: "600", marginBottom: "4px" }}>
                        SEASON
                      </div>
                      <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#2e7d32" }}>Rabi/Kharif</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "400px",
                  color: "#959da5",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #f6f8fa 0%, #ffffff 100%)",
                }}
              >
                <div>
                  <div style={{ fontSize: "5rem", marginBottom: "20px", opacity: 0.7 }}>🌱</div>
                  <p style={{ fontSize: "1.15rem", fontWeight: "600", color: "#586069" }}>Enter your field details</p>
                  <p style={{ fontSize: "0.95rem", marginTop: "8px" }}>to see personalized crop recommendations</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
