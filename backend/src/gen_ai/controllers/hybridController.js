import { getCropRecommendation } from "../services/mlService.js";
import CropHistory from "../../models/CropHistory.js";
import { explainMLResult } from "../engine/pipelines/hybridPipeline.js";

export async function hybridController(req, res) {
  try {
    const mlResult = await getCropRecommendation(req.body);

    const explanation = await explainMLResult(mlResult);

    


    res.json({
      ml_result: mlResult,
      explanation
    });
  } catch (err) {
    console.error("HYBRID CONTROLLER ERROR:", err);
    res.status(500).json({ error: "Hybrid pipeline failed" });
  }
}
