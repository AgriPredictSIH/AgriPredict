


import { useEffect, useState, useContext } from "react"
import { getCropHistory } from "../api/genaiApi"
import { AuthContext } from "../context/AuthContext"

export default function CropHistory() {
  const { token } = useContext(AuthContext)
  const [history, setHistory] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    async function loadHistory() {
      // Check if token exists in localStorage or context
      const storedToken = localStorage.getItem("token") || token
      
      if (!storedToken) {
        setLoading(false)
        setError("Please login first")
        return
      }

      try {
        const data = await getCropHistory()
        setHistory(data)
        setError("") // Clear any previous errors
      } catch (err) {
        console.error("History Error:", err)
        if (err.response?.status === 401 || err.message?.includes("token") || err.message?.includes("Unauthorized")) {
          setError("Please login first")
        } else {
          setError("Failed to load history. Please try again.")
        }
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [token])

  const Modal = ({ item, onClose }) => {
    if (!item) return null

    const resultData = item.result || {}
    const explanation = resultData.explanation || ""
    const mlResult = resultData.mlResult || resultData.ml_result || resultData

    return (
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px",
          backdropFilter: "blur(4px)"
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "white",
            borderRadius: "16px",
            maxWidth: "900px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            animation: "slideUp 0.3s ease-out"
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "24px 32px",
              borderBottom: "1px solid #e1e4e8",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
              color: "white",
              borderRadius: "16px 16px 0 0"
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>
                📋 Complete Recommendation Details
              </h2>
              <p style={{ margin: "4px 0 0 0", opacity: 0.9, fontSize: "0.9rem" }}>
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                fontSize: "1.5rem",
                color: "white",
                fontWeight: "bold"
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.3)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.2)"}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: "32px" }}>
            {/* Input Parameters */}
            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ 
                color: "#24292e", 
                marginBottom: "16px", 
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                📊 Input Parameters
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px"
                }}
              >
                {Object.entries(item.input).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      background: "#f6f8fa",
                      padding: "16px",
                      borderRadius: "8px",
                      border: "1px solid #e1e4e8"
                    }}
                  >
                    <div style={{ 
                      fontSize: "0.85rem", 
                      color: "#586069", 
                      textTransform: "capitalize",
                      marginBottom: "4px",
                      fontWeight: "500"
                    }}>
                      {key}
                    </div>
                    <div style={{ 
                      fontSize: "1.3rem", 
                      color: "#24292e",
                      fontWeight: "700"
                    }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Advice */}
            {explanation && (
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ 
                  color: "#24292e", 
                  marginBottom: "16px", 
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  💡 Expert Analysis
                </h3>
                <div
                  style={{
                    background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 100%)",
                    padding: "24px",
                    borderRadius: "12px",
                    border: "2px solid #c5e1a5",
                    color: "#1b5e20",
                    lineHeight: "1.7",
                    fontSize: "1rem",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {explanation}
                </div>
              </div>
            )}

            {/* ML Results */}
            <div>
              <h3 style={{ 
                color: "#24292e", 
                marginBottom: "16px", 
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                🤖 ML Prediction Data
              </h3>
              <pre
                style={{
                  background: "#f6f8fa",
                  padding: "24px",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
                  overflow: "auto",
                  border: "1px solid #e1e4e8",
                  color: "#24292e",
                  lineHeight: "1.6"
                }}
              >
                {JSON.stringify(explanation ? mlResult : resultData, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fa", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "800", 
            color: "#24292e",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            🌾 Crop Recommendation History
          </h1>
          <p style={{ color: "#586069", fontSize: "1.1rem" }}>
            View and analyze your past crop recommendations
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: "#fff3cd",
            border: "1px solid #ffc107",
            padding: "16px 20px",
            borderRadius: "8px",
            color: "#856404",
            marginBottom: "24px"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{
            background: "#d1ecf1",
            border: "1px solid #bee5eb",
            padding: "16px 20px",
            borderRadius: "8px",
            color: "#0c5460",
            marginBottom: "24px"
          }}>
            ⏳ Loading history...
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && history.length === 0 && (
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "80px 40px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}>
            <div style={{ fontSize: "5rem", marginBottom: "24px" }}>📋</div>
            <h3 style={{ color: "#24292e", fontSize: "1.5rem", marginBottom: "12px" }}>
              No history yet
            </h3>
            <p style={{ color: "#586069", fontSize: "1.1rem" }}>
              Start making crop recommendations to build your history.
            </p>
          </div>
        )}

        {/* History Cards */}
        <div style={{ display: "grid", gap: "24px" }}>
          {Array.isArray(history) && history.map((item, index)  => {
            const resultData = item.result || {}
            const explanation = resultData.explanation || ""
            const mlResult = resultData.mlResult || resultData.ml_result || resultData
            
            // Try multiple possible field names for predicted crop
            const predictedCrop = mlResult.predicted_crop || 
                                  mlResult.predictedCrop || 
                                  mlResult.prediction || 
                                  mlResult.crop ||
                                  resultData.predicted_crop ||
                                  resultData.prediction ||
                                  "N/A"
            
            // Try multiple possible field names for confidence
            const confidence = mlResult.confidence !== undefined 
              ? (mlResult.confidence * 100).toFixed(1)
              : mlResult.probability !== undefined
              ? (mlResult.probability * 100).toFixed(1)
              : resultData.confidence !== undefined
              ? (resultData.confidence * 100).toFixed(1)
              : "N/A"

            // Get first 150 characters of explanation
            const shortExplanation = explanation 
              ? explanation.length > 150 
                ? explanation.substring(0, 150) + "..." 
                : explanation
              : "No detailed explanation available."

            return (
              <div
                key={item._id}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "28px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  border: "1px solid #e1e4e8",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"
                }}
              >
                {/* Card Header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "12px"
                }}>
                  <div style={{
                    background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
                    color: "white",
                    padding: "8px 18px",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    📝 Record #{history.length - index}
                  </div>
                  <div style={{ 
                    color: "#586069", 
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    📅 {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* Main Content */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                  marginBottom: "20px"
                }}>
                  {/* Quick Input Summary */}
                  <div>
                    <h4 style={{ 
                      color: "#24292e", 
                      marginBottom: "12px", 
                      fontSize: "1rem",
                      fontWeight: "600"
                    }}>
                      📊 Input Summary
                    </h4>
                    <div style={{
                      background: "#f6f8fa",
                      padding: "16px",
                      borderRadius: "8px",
                      border: "1px solid #e1e4e8"
                    }}>
                      {Object.entries(item.input).slice(0, 4).map(([key, value]) => (
                        <div key={key} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "6px 0",
                          borderBottom: "1px solid #e1e4e8"
                        }}>
                          <span style={{ 
                            color: "#586069", 
                            textTransform: "capitalize",
                            fontSize: "0.9rem"
                          }}>
                            {key}:
                          </span>
                          <span style={{ 
                            fontWeight: "600", 
                            color: "#24292e",
                            fontSize: "0.9rem"
                          }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation Summary */}
                  <div>
                    <h4 style={{ 
                      color: "#24292e", 
                      marginBottom: "12px", 
                      fontSize: "1rem",
                      fontWeight: "600"
                    }}>
                      🌱 Recommendation
                    </h4>
                    <div style={{
                      background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 100%)",
                      padding: "16px",
                      borderRadius: "8px",
                      border: "1px solid #c5e1a5"
                    }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "12px"
                      }}>
                        <div>
                          <div style={{ 
                            fontSize: "0.8rem", 
                            color: "#2e7d32",
                            fontWeight: "600"
                          }}>
                            PREDICTED CROP
                          </div>
                          <div style={{
                            fontSize: "1.3rem",
                            fontWeight: "700",
                            color: "#1b5e20",
                            textTransform: "capitalize"
                          }}>
                            {predictedCrop}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ 
                            fontSize: "0.8rem", 
                            color: "#2e7d32",
                            fontWeight: "600"
                          }}>
                            CONFIDENCE
                          </div>
                          <div style={{
                            fontSize: "1.3rem",
                            fontWeight: "700",
                            color: "#1b5e20"
                          }}>
                            {confidence}%
                          </div>
                        </div>
                      </div>
                      <div style={{
                        fontSize: "0.85rem",
                        color: "#2e7d32",
                        lineHeight: "1.5"
                      }}>
                        {shortExplanation}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Show More Button */}
                <button
                  onClick={() => setSelectedItem(item)}
                  style={{
                    width: "100%",
                    padding: "12px 24px",
                    background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.02)"
                    e.target.style.boxShadow = "0 4px 12px rgba(46, 125, 50, 0.3)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)"
                    e.target.style.boxShadow = "none"
                  }}
                >
                  View Complete Details →
                </button>
              </div>
            )
          })}
        </div>

        {/* Modal */}
        {selectedItem && (
          <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </div>
    </div>
  )
}
