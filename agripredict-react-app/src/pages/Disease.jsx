"use client"

import { useState } from "react"
import { diseaseAPI, diseaseImageAPI } from "../api/genaiApi"

export default function Disease() {
  const [crop, setCrop] = useState("")
  const [image, setImage] = useState(null)
  const [symptoms, setSymptoms] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  async function checkWithImage() {
    if (!crop || !image) return alert("Please provide crop name and image")

    setLoading(true)
    const form = new FormData()
    form.append("crop", crop)
    form.append("image", image)

    try {
      const res = await diseaseImageAPI(form)
      setResult(res)
    } catch (error) {
      alert("Image detection failed")
    } finally {
      setLoading(false)
    }
  }

  async function checkDisease() {
    if (!crop || !symptoms) return alert("Please provide crop name and symptoms")

    try {
      setLoading(true)
      const res = await diseaseAPI({
        crop,
        symptoms: symptoms.split(",").map((s) => s.trim()),
      })
      setResult(res)
    } catch (err) {
      alert("Disease detection failed")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <h2 style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "2.5rem" }}>🌿</span>
          Crop Disease Detection
        </h2>
        <p style={{ color: "#586069", fontSize: "1.05rem", marginTop: "8px", marginBottom: "32px" }}>
          Identify plant diseases using symptoms or upload a leaf image for instant AI detection
        </p>

        <div className="two-column-layout">
          {/* Text-based Detection */}
          <div className="card">
            <h3 style={{ fontSize: "1.3rem", marginBottom: "24px", color: "#24292e" }}>📝 Symptom-Based Detection</h3>

            <div className="form-group">
              <label>Crop Name</label>
              <input placeholder="e.g. Tomato, Wheat, Rice" value={crop} onChange={(e) => setCrop(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Symptoms (comma separated)</label>
              <textarea
                placeholder="e.g. yellow leaves, brown spots, wilting"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows="4"
                style={{ resize: "vertical" }}
              />
            </div>

            <button
              onClick={checkDisease}
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "1.05rem",
                fontWeight: "700",
              }}
            >
              {loading ? "🔄 Analyzing..." : "🔍 Check Disease"}
            </button>
          </div>

          {/* Image-based Detection */}
          <div className="card">
            <h3 style={{ fontSize: "1.3rem", marginBottom: "24px", color: "#24292e" }}>📸 Image-Based Detection</h3>

            <div className="form-group">
              <label>Crop Name</label>
              <input placeholder="e.g. Tomato, Potato" value={crop} onChange={(e) => setCrop(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Upload Leaf Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ padding: "10px", background: "#f5f7fa" }}
              />
            </div>

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" />
              </div>
            )}

            <button
              onClick={checkWithImage}
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "1.05rem",
                fontWeight: "700",
              }}
            >
              {loading ? "🔄 Detecting..." : "🎯 Detect from Image"}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div
            className="card"
            style={{
              marginTop: "32px",
              borderLeft: "5px solid #2196f3",
              background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
            }}
          >
            <h3
              style={{
                color: "#1976d2",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "1.4rem",
              }}
            >
              📊 Detection Results
            </h3>
            <pre
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "10px",
                overflow: "auto",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                border: "2px solid #bbdefb",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "#24292e",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
