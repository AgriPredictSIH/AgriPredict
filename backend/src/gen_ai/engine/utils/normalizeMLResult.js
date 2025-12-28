export function normalizeMLResult(result) {
  if (!result) {
    return {
      crop: "Unknown",
      confidence: null,
      expectedYield: "Unknown",
      reasoning: ""
    };
  }

  // 🟢 NEW FORMAT (object)
  if (typeof result === "object" && result.crop) {
    return {
      crop: result.crop || "Unknown",
      confidence: result.confidence ?? null,
      expectedYield: result.expectedYield || "Unknown",
      reasoning: result.reasoning || ""
    };
  }

  // 🟡 OLD FORMAT (string)
  if (typeof result === "string") {
    return {
      crop: result,
      confidence: null,
      expectedYield: "Unknown",
      reasoning: ""
    };
  }

  return {
    crop: "Unknown",
    confidence: null,
    expectedYield: "Unknown",
    reasoning: ""
  };
}
