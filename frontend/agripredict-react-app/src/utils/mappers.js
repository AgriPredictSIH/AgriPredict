// frontend/src/utils/mappers.js

export const mapCropData = (apiData) => {
  return {
    title: apiData.crop || "Unknown Crop",
    scoreDisplay: apiData.score ? `${(apiData.score * 100).toFixed(0)}%` : "N/A",
    yield: apiData.yield || "High potential",
    fertilizer: apiData.fertilizer_plan || "Balanced NPK recommended",
    soilMoisture: apiData.soil_data?.moisture_percent 
      ? `${apiData.soil_data.moisture_percent}%` 
      : "N/A"
  };
};

export const mapDiseaseData = (apiData) => {
  return {
    disease: apiData.disease,
    confidence: apiData.confidence,
    treatment: apiData.treatment
  };
};