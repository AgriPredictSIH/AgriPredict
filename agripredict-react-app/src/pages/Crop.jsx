import { useState } from "react";
import { cropAPI } from "../api/genaiApi";

export default function Crop() {
  const [soil, setSoil] = useState("Loamy");

  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    setResult(null);

    try {
      setLoading(true);

      const data = await cropAPI({
        soil,
        nitrogen: Number(nitrogen),
        phosphorus: Number(phosphorus),
        potassium: Number(potassium),
        temperature: Number(temperature),
        humidity: Number(humidity),
        ph: Number(ph),
        rainfall: Number(rainfall)
      });

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please check inputs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="crop-container">
      <h1>🌾 AI Crop Recommendation</h1>

      <div className="form-card">
        <h3>📋 Enter Field Details</h3>

        {/* Soil */}
        <label>Soil Type</label>
        <select value={soil} onChange={e => setSoil(e.target.value)}>
          <option>Loamy</option>
          <option>Sandy</option>
          <option>Clay</option>
          <option>Black</option>
          <option>Red</option>
        </select>

        {/* NPK */}
        <label>Nitrogen (N)</label>
        <input type="number" value={nitrogen} onChange={e => setNitrogen(e.target.value)} />

        <label>Phosphorus (P)</label>
        <input type="number" value={phosphorus} onChange={e => setPhosphorus(e.target.value)} />

        <label>Potassium (K)</label>
        <input type="number" value={potassium} onChange={e => setPotassium(e.target.value)} />

        {/* Climate */}
        <label>Temperature (°C)</label>
        <input type="number" value={temperature} onChange={e => setTemperature(e.target.value)} />

        <label>Humidity (%)</label>
        <input type="number" value={humidity} onChange={e => setHumidity(e.target.value)} />

        <label>Soil pH</label>
        <input type="number" step="0.1" value={ph} onChange={e => setPh(e.target.value)} />

        <label>Rainfall (mm)</label>
        <input type="number" value={rainfall} onChange={e => setRainfall(e.target.value)} />

        <button onClick={submit} disabled={loading}>
          {loading ? "Predicting..." : "Predict Crop"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      {/* RESULT */}
      {result && (
        <div className="result-card">
          <h2>✅ Recommended Crop</h2>
          <h1>{result.crop}</h1>

          <p>{result.reasoning}</p>

          <div className="stats">
            <div>
              <span>Confidence</span>
              <h3>{Math.round(result.confidence * 100)}%</h3>
            </div>

            <div>
              <span>Expected Yield</span>
              <h3>{result.expectedYield}</h3>
            </div>
          </div>

          <h3>🤖 AI Explanation</h3>
          <pre>{result.explanation}</pre>
        </div>
      )}
    </div>
  );
}
