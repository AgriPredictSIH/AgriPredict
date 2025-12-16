import { useState } from "react";
import { diseaseAPI,diseaseImageAPI } from "../api/genaiApi";

export default function Disease() {
  const [crop, setCrop] = useState("");
    const [image, setImage] = useState(null);

  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkWithImage() {
    const form = new FormData();
    form.append("crop", crop);
    form.append("image", image);

    const res = await diseaseImageAPI(form);
    setResult(res);
  }

  async function checkDisease() {
    try {
      setLoading(true);

      const res = await diseaseAPI({
        crop,
        symptoms: symptoms.split(",").map(s => s.trim())
      });

      setResult(res);
    } catch (err) {
      alert("Disease detection failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
    <div style={{ padding: "20px" }}>
      <h2>🌿 Crop Disease Detection</h2>

      <input
        placeholder="Crop name (e.g. Tomato)"
        value={crop}
        onChange={e => setCrop(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Symptoms (comma separated)"
        value={symptoms}
        onChange={e => setSymptoms(e.target.value)}
      />

      <br /><br />

      <button onClick={checkDisease} disabled={loading}>
        {loading ? "Checking..." : "Check Disease"}
      </button>

      <br /><br />

      {result && (
        <pre style={{ background: "#f4f4f4", padding: "10px" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>

    <div style={{ padding: 20 }}>
      <h2>Disease Detection</h2>

      <input placeholder="Crop" onChange={e => setCrop(e.target.value)} />
      <br /><br />

      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <br /><br />

      <button onClick={checkWithImage}>Detect from Image</button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
    </div>
  );
}
