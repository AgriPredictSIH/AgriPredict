// frontend/src/pages/CropRecommendation.jsx
import { useState } from 'react';
import { getCropRecommendation } from '../services/api.js';
import { mapCropData } from '../utils/mappers.js';

function CropRecommendation() {
  const [formData, setFormData] = useState({
    npk: '',
    ph: '',
    weather: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.npk || !formData.ph || !formData.weather) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await getCropRecommendation(formData);
      const mapped = mapCropData(response);
      setResult(mapped);
    } catch (err) {
      console.error(err);
      alert('Backend not running or network error. Start backend on port 5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Crop Recommendation</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label><strong>NPK (N,P,K):</strong></label><br />
          <input
            type="text"
            name="npk"
            placeholder="e.g., 90,42,43"
            value={formData.npk}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label><strong>pH Value:</strong></label><br />
          <input
            type="number"
            name="ph"
            step="0.1"
            placeholder="e.g., 6.5"
            value={formData.ph}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label><strong>Weather (Temp°C, Humidity%, Rainfall mm):</strong></label><br />
          <input
            type="text"
            name="weather"
            placeholder="e.g., 26,82,200"
            value={formData.weather}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Analyzing with NASA + Weather Data...' : 'Get Recommendation'}
        </button>
      </form>

      {result && (
        <div className="card" style={{
          marginTop: '2rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, #e8f5e8, #d4edda)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#2e7d32' }}>Recommended Crop: {result.title}</h2>
          <p><strong>Confidence Level:</strong> {result.scoreDisplay}</p>
          <p><strong>Expected Yield:</strong> {result.yield}</p>
          <p><strong>Soil Moisture (NASA Satellite):</strong> {result.soilMoisture}</p>
          <p><strong>Fertilizer Advice:</strong> {result.fertilizer}</p>
        </div>
      )}
    </div>
  );
}

export default CropRecommendation;