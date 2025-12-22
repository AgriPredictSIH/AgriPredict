export function recommendCrop({ soil, rainfall, temperature }) {
  if (soil === "sandy" && rainfall < 150) {
    return {
      crop: "Millets",
      confidence: 0.75,
      expected_yield: "20 quintals",
      reasoning: "Low rainfall + sandy soil favors drought resistant crops"
    };
  }

  if (soil === "clay" && rainfall > 200) {
    return {
      crop: "Rice",
      confidence: 0.8,
      expected_yield: "30 quintals",
      reasoning: "High rainfall + clay soil retains water well"
    };
  }

  return {
    crop: "Groundnut",
    confidence: 0.6,
    expected_yield: "18 quintals",
    reasoning: "Balanced conditions favor oilseed crops"
  };
}
