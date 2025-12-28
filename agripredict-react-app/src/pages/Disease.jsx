"use client";

import { useState } from "react";
import { diseaseAPI, diseaseImageAPI } from "../api/genaiApi";
import "../assets/css/Disease.css";

export default function Disease() {
  const [crop, setCrop] = useState("");
  const [leafColor, setLeafColor] = useState("");
  const [spotColor, setSpotColor] = useState("");
  const [leafSpots, setLeafSpots] = useState(false);
  const [wilting, setWilting] = useState(false);
  const [moldPresence, setMoldPresence] = useState(false);
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(70);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // ================= TEXT-BASED =================
  async function checkDisease() {
    if (!crop || !leafColor || !spotColor) {
      return alert("Please provide crop, leaf color, and spot color");
    }

    try {
      setLoading(true);

      const res = await diseaseAPI({
        crop,
        leaf_color: leafColor,
        leaf_spots: leafSpots ? 1 : 0,
        spot_color: spotColor,
        wilting: wilting ? 1 : 0,
        mold_presence: moldPresence ? 1 : 0,
        temperature,
        humidity
      });

      setResult(res);
    } catch (err) {
      alert("Disease detection failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ================= IMAGE-BASED =================
  async function checkWithImage() {
    if (!crop || !image) {
      return alert("Please provide crop name and image");
    }

    setLoading(true);
    const form = new FormData();
    form.append("crop", crop);
    form.append("image", image);

    try {
      const res = await diseaseImageAPI(form);
      setResult(res);
    } catch (error) {
      alert("Image detection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <h2>🌿 Crop Disease Detection</h2>
        <p className="subtitle">
          Identify plant diseases using symptoms or upload a leaf image
        </p>

        <div className="two-column-layout">
          {/* TEXT BASED */}
          <div className="card">
            <h3>🔍 Symptom-Based Detection</h3>

            <div className="form-group">
              <label>Crop Name</label>
              <input value={crop} onChange={(e) => setCrop(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Leaf Color</label>
              <input value={leafColor} onChange={(e) => setLeafColor(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Spot Color</label>
              <input value={spotColor} onChange={(e) => setSpotColor(e.target.value)} />
            </div>

            <div className="checkbox-group">
              <label>
                <input type="checkbox" checked={leafSpots} onChange={() => setLeafSpots(!leafSpots)} />
                Leaf Spots Present
              </label>

              <label>
                <input type="checkbox" checked={wilting} onChange={() => setWilting(!wilting)} />
                Wilting
              </label>

              <label>
                <input type="checkbox" checked={moldPresence} onChange={() => setMoldPresence(!moldPresence)} />
                Mold Presence
              </label>
            </div>

            <div className="form-group">
              <label>Temperature (°C): {temperature}</label>
              <input type="range" min="0" max="50" value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))} />
            </div>

            <div className="form-group">
              <label>Humidity (%): {humidity}</label>
              <input type="range" min="0" max="100" value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))} />
            </div>

            <button onClick={checkDisease} disabled={loading}>
              {loading ? "Analyzing..." : "🔎 Check Disease"}
            </button>
          </div>

          {/* IMAGE BASED */}
          <div className="card">
            <h3>📸 Image-Based Detection</h3>

            <input placeholder="Crop Name" value={crop} onChange={(e) => setCrop(e.target.value)} />
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

            <button onClick={checkWithImage} disabled={loading}>
              {loading ? "Detecting..." : "🎯 Detect from Image"}
            </button>
          </div>
        </div>

        {/* RESULTS */}
        {result && (
          <div className="card results-card">
            <h3>📊 Detection Results</h3>
            <p><strong>Disease:</strong> {result.disease}</p>
            <p><strong>Confidence:</strong> {Math.round(result.confidence * 100)}%</p>
            <p><strong>Severity:</strong> {result.severity}</p>
            {result.explanation && <pre>{result.explanation}</pre>}
          </div>
        )}
      </div>
    </div>
  );
}
