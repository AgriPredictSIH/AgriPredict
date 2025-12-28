import { useEffect, useState, useContext } from "react";
import { getCropHistory } from "../api/genaiApi";
import { AuthContext } from "../context/AuthContext";

export default function CropHistory() {
  const { token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function loadHistory() {
      const storedToken = localStorage.getItem("token") || token;

      if (!storedToken) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      try {
        const data = await getCropHistory();
        setHistory(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        console.error("History Error:", err);
        setError("Failed to load history");
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [token]);

  /* =========================
     MODAL
  ========================= */
  const Modal = ({ item, onClose }) => {
    if (!item) return null;

    const ml = item.result?.crop || {};
    const explanation = item.result?.explanation || "";

    return (
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: "12px",
            maxWidth: "800px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "24px"
          }}
        >
          <h2>📋 Recommendation Details</h2>

          <p><strong>Crop:</strong> {ml.crop}</p>
          <p><strong>Confidence:</strong> {ml.confidence !== null ? (ml.confidence * 100).toFixed(1) + "%" : "N/A"}</p>
          <p><strong>Expected Yield:</strong> {ml.expectedYield}</p>
          <p><strong>Reasoning:</strong> {ml.reasoning}</p>

          <hr />

          <h3>🧠 AI Explanation</h3>
          <p>{explanation || "No explanation available"}</p>

          <hr />

          <h3>🔍 Raw ML JSON</h3>
          <pre style={{ background: "#f6f8fa", padding: "12px" }}>
            {JSON.stringify(ml, null, 2)}
          </pre>

          <button onClick={onClose} style={{ marginTop: "16px" }}>
            Close
          </button>
        </div>
      </div>
    );
  };

  /* =========================
     MAIN RENDER
  ========================= */
  return (
    <div style={{ padding: "40px", minHeight: "100vh", background: "#f6f8fa" }}>
      <h1>🌾 Crop Recommendation History</h1>

      {loading && <p>⏳ Loading history...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && history.length === 0 && (
        <p>No history available</p>
      )}

      <div style={{ display: "grid", gap: "16px" }}>
        {history.map((item) => {
          const ml = item.result?.crop || {};

          return (
            <div
              key={item._id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <p><strong>🌱 Crop:</strong> {ml.crop}</p>
              <p><strong>📊 Confidence:</strong> {ml.confidence !== null ? (ml.confidence * 100).toFixed(1) + "%" : "N/A"}</p>
              <p><strong>📈 Expected Yield:</strong> {ml.expectedYield}</p>

              <button
                onClick={() => setSelectedItem(item)}
                style={{
                  marginTop: "10px",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: "#2e7d32",
                  color: "#fff"
                }}
              >
                View Details →
              </button>
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
