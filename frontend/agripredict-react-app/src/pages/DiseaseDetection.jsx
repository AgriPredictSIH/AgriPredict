import { useState } from 'react';
import { detectDisease } from '../services/api.js';

function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await detectDisease(formData);
      setResult(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Disease Detection</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Detect</button>
      {result && (
        <div className="card">
          <p>Disease: {result.disease}</p>
          <p>Confidence: {result.confidence}</p>
          <p>Treatment: {result.treatment}</p>
        </div>
      )}
    </div>
  );
}

export default DiseaseDetection;