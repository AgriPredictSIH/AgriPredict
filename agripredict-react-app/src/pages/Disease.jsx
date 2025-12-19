"use client"

import { useState } from "react"
import { diseaseAPI, diseaseImageAPI } from "../api/genaiApi"
import "../assets/css/Disease.css"

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
        <h2>
          <span>🌿</span>
          Crop Disease Detection
        </h2>
        <p style={{ color: "#586069", fontSize: "1.05rem", marginTop: "8px", marginBottom: "32px" }}>
          Identify plant diseases using symptoms or upload a leaf image for instant AI detection
        </p>

        <div className="two-column-layout">
          {/* Text-based Detection */}
          <div className="card">
            <h3>🔍 Symptom-Based Detection</h3>

            <div className="form-group">
              <label>Crop Name</label>
              <input 
                placeholder="e.g. Tomato, Wheat, Rice" 
                value={crop} 
                onChange={(e) => setCrop(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Symptoms (comma separated)</label>
              <textarea
                placeholder="e.g. yellow leaves, brown spots, wilting"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows="4"
              />
            </div>

            <button onClick={checkDisease} disabled={loading}>
              {loading ? "Analyzing..." : "🔎 Check Disease"}
            </button>
          </div>

          {/* Image-based Detection */}
          <div className="card">
            <h3>📸 Image-Based Detection</h3>

            <div className="form-group">
              <label>Crop Name</label>
              <input 
                placeholder="e.g. Tomato, Potato" 
                value={crop} 
                onChange={(e) => setCrop(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Upload Leaf Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Leaf preview" />
              </div>
            )}

            <button onClick={checkWithImage} disabled={loading}>
              {loading ? "Detecting..." : "🎯 Detect from Image"}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="card results-card">
            <h3 className="results-header">
              📊 Detection Results
            </h3>
            <pre className="results-content">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}