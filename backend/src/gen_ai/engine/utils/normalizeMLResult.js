export function normalizeMLResult(raw) {
  if (!raw || typeof raw !== "object") {
    return {
      crop: "Unknown",
      confidence: null,
      expectedYield: "Unknown",
      reasoning: ""
    };
  }

  return {
    crop:
      raw.crop ||
      raw.predicted_crop ||
      raw.predictedCrop ||
      raw.prediction ||
      "Unknown",

    confidence:
      typeof raw.confidence === "number"
        ? raw.confidence
        : typeof raw.probability === "number"
        ? raw.probability
        : null,

    expectedYield:
      raw.expected_yield ||
      raw.expectedYield ||
      raw.yield ||
      "Unknown",

    reasoning:
      raw.reasoning ||
      raw.explanation ||
      raw.reason ||
      ""
  };
}
