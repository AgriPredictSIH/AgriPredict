import { detectDisease } from "../services/mlService.js";
import { explainDisease } from "../engine/pipelines/diseasePipeline.js";

export async function diseaseController(req, res) {
  try {
    const mlResult = await detectDisease(req.body);
    const explanation = await explainDisease(mlResult);

    res.json({
      ml_result: mlResult,
      explanation
    });
  } catch (err) {
    console.error("DISEASE ERROR:", err);
    res.status(500).json({ error: "Disease pipeline failed" });
  }
}
