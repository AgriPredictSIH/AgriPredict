import { useState } from 'react';
import { getMarketPrice } from '../services/api.js';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function MarketPrices() {
  const [formData, setFormData] = useState({ crop: '', region: '' });
  const [chartData, setChartData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await getMarketPrice(formData);
      setChartData({
        labels: response.dates,
        datasets: [
          {
            label: 'Price Trend',
            data: response.prices,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Market Prices</h1>
      <input name="crop" placeholder="Crop" onChange={handleChange} />
      <input name="region" placeholder="Region" onChange={handleChange} />
      <button onClick={handleSubmit}>Get Prices</button>
      {chartData && <Line data={chartData} />}
    </div>
  );
}

export default MarketPrices;