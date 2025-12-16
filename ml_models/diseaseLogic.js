export function detectDisease({ crop, symptoms }) {
  if (
    crop === "Tomato" &&
    symptoms.includes("yellow leaves") &&
    symptoms.includes("curling")
  ) {
    return {
      disease: "Leaf Curl Virus",
      confidence: 0.82,
      severity: "medium"
    };
  }

  if (
    crop === "Rice" &&
    symptoms.includes("brown spots")
  ) {
    return {
      disease: "Brown Spot Disease",
      confidence: 0.78,
      severity: "low"
    };
  }

  return {
    disease: "Healthy",
    confidence: 0.9,
    severity: "none"
  };
}
