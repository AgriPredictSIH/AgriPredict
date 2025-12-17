"use client"

import { useEffect, useState, useContext } from "react"
import { getCropHistory } from "../api/genaiApi"
import { AuthContext } from "../context/AuthContext"

export default function CropHistory() {
  const { token } = useContext(AuthContext)
  const [history, setHistory] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHistory() {
      // getCropHistory in api/genaiApi.js gets the token from localStorage automatically,
      // but we keep the dependency on 'token' context to trigger updates.
      try {
        const data = await getCropHistory()
        setHistory(data)
      } catch (err) {
        console.error("History Error:", err)
        setError("Failed to load history")
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      loadHistory()
    } else {
        setLoading(false)
        setError("Please login first")
    }
  }, [token])

  return (
    <div className="page">
      <div className="container">
        <h2>🌾 Crop Recommendation History</h2>

        {error && <div className="error-alert">{error}</div>}

        {loading && <div className="info-alert">Loading history...</div>}

        {!loading && !error && history.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "16px" }}>📋</div>
            <h3 style={{ color: "#586069" }}>No history yet</h3>
            <p style={{ color: "#586069" }}>Start making crop recommendations to build your history.</p>
          </div>
        )}

        <div style={{ display: "grid", gap: "20px" }}>
          {history.map((item, index) => {
            // Helper to safely access explanation and result
            const resultData = item.result || {};
            const explanation = resultData.explanation || "";
            const mlResult = resultData.mlResult || resultData.ml_result || resultData; 
            
            return (
            <div key={item._id} className="history-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    background: "#2e7d32",
                    color: "white",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  Record #{history.length - index}
                </div>
                <div style={{ color: "#586069", fontSize: "0.9rem" }}>{new Date(item.createdAt).toLocaleString()}</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "16px" }}>
                {/* INPUT SECTION */}
                <div>
                  <h4 style={{ color: "#24292e", marginBottom: "12px", fontSize: "1rem" }}>Input Parameters:</h4>
                  <pre
                    style={{
                      background: "#f5f7fa",
                      padding: "16px",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      overflow: "auto",
                      border: "1px solid #e1e4e8",
                      maxHeight: "200px"
                    }}
                  >
                    {JSON.stringify(item.input, null, 2)}
                  </pre>
                </div>

                {/* RESULT SECTION */}
                <div>
                  <h4 style={{ color: "#24292e", marginBottom: "12px", fontSize: "1rem" }}>Recommendation:</h4>
                  
                  {/* Display Explanation Text if available */}
                  {explanation ? (
                     <div style={{
                        background: "#e8f5e9",
                        padding: "16px",
                        borderRadius: "6px",
                        border: "1px solid #c5e1a5",
                        color: "#1b5e20",
                        marginBottom: "10px",
                        whiteSpace: "pre-wrap"
                     }}>
                        <strong>Expert Advice:</strong><br/>
                        {explanation}
                     </div>
                  ) : null}

                  {/* Fallback or ML Data */}
                  <pre
                    style={{
                      background: "#e8f5e9",
                      padding: "16px",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      overflow: "auto",
                      border: "1px solid #c5e1a5",
                      color: "#2e7d32",
                      maxHeight: "200px"
                    }}
                  >
                    {/* If we showed explanation, show just ML data here. If no explanation, show whole result */}
                    {JSON.stringify(explanation ? mlResult : resultData, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  )
}