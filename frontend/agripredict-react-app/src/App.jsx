// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Chatbot from './pages/Chatbot.jsx';
import CropRecommendation from './pages/CropRecommendation.jsx';
import DiseaseDetection from './pages/DiseaseDetection.jsx';
import MarketPrices from './pages/MarketPrices.jsx';
import WeatherInsights from './pages/WeatherInsights.jsx';

function App() {
  return (
    <AppProvider>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/crop-recommendation" element={<CropRecommendation />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/market-prices" element={<MarketPrices />} />
            <Route path="/weather-insights" element={<WeatherInsights />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;