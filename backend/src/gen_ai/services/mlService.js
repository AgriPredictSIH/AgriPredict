import { apiRequest } from "./apiClient.js";

/* Crop Recommendation */
export function getCropRecommendation(input) {
  return apiRequest("/ml/crop-recommendation", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/* Disease Detection (text/data) */
export function detectDisease(input) {
  return apiRequest("/ml/disease-detect", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/* Market Price */
export function getMarketPrice(input) {
  return apiRequest("/ml/market-price", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/* Disease Detection (image meta) */
export function detectDiseaseFromImage(input) {
  return apiRequest("/ml/disease-from-image", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
