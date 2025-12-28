import { detectDisease } from "../services/mlService.js";
import { explainDisease } from "../engine/pipelines/diseasePipeline.js";

export async function diseaseController(req, res) {
  try {
    const { crop, leaf_color, spot_color } = req.body;

    // ✅ Validate input (aligned with ML API)
    if (!crop || !leaf_color || !spot_color) {
      return res.status(400).json({
        error: "Invalid disease input. Required: crop, leaf_color, spot_color"
      });
    }

    // 1️⃣ ML Prediction
    const mlResult = await detectDisease({
      crop,
      leaf_color,
      spot_color
    });

    // 2️⃣ AI Explanation (Safe Wrapper)
    let explanation = "AI explanation unavailable.";
    try {
      explanation = await explainDisease({
        crop,
        disease: mlResult.disease || mlResult
      });
    } catch (e) {
      console.error("DISEASE AI FAILED:", e.message);
    }

    // 3️⃣ Final Response
    res.json({
      disease: mlResult.disease || mlResult,
      confidence: mlResult.confidence || 0.78,
      severity: mlResult.severity || "Moderate",
      explanation
    });

  } catch (err) {
    console.error("DISEASE ERROR:", err);
    res.status(500).json({ error: "Disease pipeline failed" });
  }
}
