import { useState } from 'react';
import { getWeather } from '../services/api.js';

function WeatherInsights() {
  const [location, setLocation] = useState(null);
  const [result, setResult] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    });
  };

  const handleSubmit = async () => {
    if (!location) return getLocation();
    try {
      const response = await getWeather(location);
      setResult(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Weather Insights</h1>
      <button onClick={handleSubmit}>Get Weather</button>
      {result && (
        <div className="card">
          <p>Forecast: {result.forecast}</p>
          <p>Advice: {result.advice}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherInsights;