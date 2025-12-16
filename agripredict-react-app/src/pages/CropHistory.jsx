import { useEffect, useState, useContext } from "react";
import { getCropHistory } from "../api/genaiApi";
import { AuthContext } from "../context/AuthContext";

export default function CropHistory() {
  const { token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHistory() {
      if (!token) {
        setError("Please login first");
        return;
      }

      try {
        const data = await getCropHistory(token);
        setHistory(data);
      } catch {
        setError("Failed to load history");
      }
    }

    loadHistory();
  }, [token]);

  return (
    <div style={{ padding: 20 }}>
      <h2>🌾 Crop Recommendation History</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {history.length === 0 && <p>No history yet</p>}

      {history.map(item => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10
          }}
        >
          <p><b>Date:</b> {new Date(item.createdAt).toLocaleString()}</p>

          <p><b>Input:</b></p>
          <pre>{JSON.stringify(item.input, null, 2)}</pre>

          <p><b>Result:</b></p>
          <pre>{JSON.stringify(item.result, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
