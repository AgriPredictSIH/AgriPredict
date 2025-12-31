import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/chatbot">AI Chatbot</Link>
      <Link to="/crop-recommendation">Crop Recommendation</Link>
      <Link to="/disease-detection">Disease Detection</Link>
      <Link to="/market-prices">Market Prices</Link>
      <Link to="/weather-insights">Weather Insights</Link>
    </nav>
  );
}

export default NavBar;