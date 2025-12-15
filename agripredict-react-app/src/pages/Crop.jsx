import { useState, useContext } from "react";
import { cropAPI } from "../api/genaiApi";
import { AuthContext } from "../context/AuthContext";

export default function Crop() {
  const { token } = useContext(AuthContext);

  const [soil, setSoil] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    setResult(null);

    if (!token) {
      setError("Please login first");
      return;
    }

    try {
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
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Crop Recommendation</h2>

      <input
        placeholder="Soil type"
        value={soil}
        onChange={e => setSoil(e.target.value)}
      />
      <br />

      <input
        placeholder="Rainfall"
        value={rainfall}
        onChange={e => setRainfall(e.target.value)}
      />
      <br />

      <input
        placeholder="Temperature"
        value={temperature}
        onChange={e => setTemperature(e.target.value)}
      />
      <br />

      <button onClick={submit}>Predict</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
