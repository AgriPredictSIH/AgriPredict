import { getCropRecommendation } from "../services/mlService.js";
import CropHistory from "../../models/CropHistory.js";
import { explainMLResult } from "../engine/pipelines/hybridPipeline.js";

export async function hybridController(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const mlResult = await getCropRecommendation(req.body);

    if (!mlResult?.crop) {
      throw new Error("Invalid ML response");
    }

    let explanation = "AI explanation unavailable.";
    try {
      explanation = await explainMLResult(mlResult);
    } catch {}

    const finalResult = {
      ...mlResult,
      explanation
    };

    await CropHistory.create({
      user: req.user._id,
      input: req.body,
      result: finalResult
    });

    res.json(finalResult);

  } catch (err) {
    console.error("HYBRID ERROR:", err.message);
    res.status(500).json({ error: "Crop recommendation failed" });
  }
}
