import { useState, useContext } from "react";
import { cropAPI } from "../api/genaiApi";
import { AuthContext } from "../context/AuthContext";
import "./Crop.css";

export default function Crop() {
  const { token } = useContext(AuthContext);

  const [soil, setSoil] = useState("Sandy");
  const [rainfall, setRainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    setResult(null);

    if (!token) {
      setError("Please login first");
      return;
    }

    try {
      setLoading(true);
      const data = await cropAPI(
        {
          soil,
          rainfall: Number(rainfall),
          temperature: Number(temperature)
        },
        token
      );
      setResult(data);
    } catch (err) {
      setError("Failed to fetch recommendation");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="crop-container">
      <h1>Get AI-powered crop recommendations based on your soil and weather conditions</h1>

      <div className="form-card">
        <h3>📋 Enter Field Details</h3>

        <label>Soil Type</label>
        <select value={soil} onChange={e => setSoil(e.target.value)}>
          <option value="Sandy">Sandy</option>
          <option value="Clay">Clay</option>
          <option value="Loamy">Loamy</option>
          <option value="Black">Black</option>
          <option value="Red">Red</option>
        </select>

        <label>Annual Rainfall (mm)</label>
        <input
          type="number"
          value={rainfall}
          onChange={e => setRainfall(e.target.value)}
          placeholder="e.g. 700"
        />

        <label>Average Temperature (°C)</label>
        <input
          type="number"
          value={temperature}
          onChange={e => setTemperature(e.target.value)}
          placeholder="e.g. 28"
        />

        <button onClick={submit} disabled={loading}>
          🚀 {loading ? "Predicting..." : "Predict Best Crop"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      {result && (
  <div className="result-card">
    <h3>✅ Recommended Crop</h3>
    <h2>{result.ml_result.crop}</h2>

    <p className="desc">
      {result.ml_result.reasoning}
    </p>

    <div className="stats">
      <div>
        <span>CONFIDENCE SCORE</span>
        <h2>{Math.round(result.ml_result.confidence * 100)}%</h2>
      </div>

      <div>
        <span>EXPECTED YIELD</span>
        <h2>{result.ml_result.expected_yield}</h2>
      </div>
    </div>

    <div style={{ marginTop: "15px", color: "#2e7d32" }}>
      <strong>Explanation:</strong>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {result.explanation}
      </pre>
    </div>
  </div>
)}

    </div>
  );
}
