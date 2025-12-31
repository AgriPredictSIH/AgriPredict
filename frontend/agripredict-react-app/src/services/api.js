// frontend/src/services/api.js

import axios from 'axios';

// Base URL - Vite automatically proxies /api to localhost:5000 (from vite.config.js)
const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// ==================== CHATBOT ====================
export const sendChatMessage = async (message) => {
  const res = await API.post('/ai/chat', { message });
  return res.data;
};

// ==================== CROP RECOMMENDATION ====================
export const getCropRecommendation = async (data) => {
  const res = await API.post('/ml/crop-recommendation', data);
  return res.data;
};

// ==================== DISEASE DETECTION ====================
export const detectDisease = async (formData) => {
  const res = await API.post('/ml/disease-detect', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// ==================== MARKET PRICES ====================
export const getMarketPrice = async (data) => {
  const res = await API.post('/ml/market-price', data);
  return res.data;
};

// ==================== WEATHER (Real OpenWeather) ====================
export const getWeather = async (location) => {
  const res = await API.post('/ml/weather', location);
  return res.data;
};

// ==================== NASA SOIL (Real Satellite Data) ====================
export const getSoilAnalysis = async (location) => {
  const res = await API.post('/ml/soil-analysis', location);
  return res.data;
};

export default API;