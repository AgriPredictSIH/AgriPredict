export function detectDiseaseFromImage(filename, crop) {
  // MOCK logic based on filename
  if (filename.toLowerCase().includes("yellow")) {
    return {
      crop,
      detected_symptoms: ["yellow leaves", "curling"],
      disease: "Leaf Curl Virus",
      confidence: 0.84
    };
  }

  return {
    crop,
    detected_symptoms: [],
    disease: "Healthy",
    confidence: 0.9
  };
}
