import { useState } from "react";

export default function Disease() {
  const [out, setOut] = useState(null);

  async function check() {
    const res = await fetch("http://localhost:6001/api/ml/disease-detect", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({
        crop: "Groundnut",
        symptoms: "yellow leaves",
        humidity: 75
      })
    });
    setOut(await res.json());
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Disease Detection</h2>
      <button onClick={check}>Check Disease</button>
      <pre>{JSON.stringify(out, null, 2)}</pre>
    </div>
  );
}
