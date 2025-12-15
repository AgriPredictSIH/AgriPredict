import { useEffect, useState, useContext } from "react";
import { getCropHistory } from "../api/genaiApi";
import { AuthContext } from "../context/AuthContext";

export default function CropHistory() {
  const { token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (token) {
      getCropHistory(token).then(setHistory);
    }
  }, [token]);

  if (!token) return <p>Please login to view crop history</p>;

  return (
    <div className="page">
      <h2>🌾 Crop Recommendation History</h2>

      {history.length === 0 && <p>No history found</p>}

      {history.map((item, index) => (
        <div key={index} className="history-card">
          <h4>Input Data</h4>
          <p>Soil: {item.input.soil}</p>
          <p>Rainfall: {item.input.rainfall} mm</p>
          <p>Temperature: {item.input.temperature} °C</p>

          <h4>Recommendation</h4>
          <p>
            <b>Crop:</b> {item.result.mlResult?.crop}
          </p>
          <p>
            <b>Explanation:</b> {item.result.explanation}
          </p>

          <small>
            {new Date(item.createdAt).toLocaleString()}
          </small>

          <hr />
        </div>
      ))}
    </div>
  );
}
