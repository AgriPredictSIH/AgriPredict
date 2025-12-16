import { getCropRecommendation } from "../services/mlService.js";
import CropHistory from "../../models/CropHistory.js";
import { explainMLResult } from "../engine/pipelines/hybridPipeline.js";

export async function hybridController(req, res) {
  try {
    // 🔐 Safety check
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 1️⃣ ML
    const mlResult = await getCropRecommendation(req.body);

    // 2️⃣ AI explanation
    const explanation = await explainMLResult(mlResult);

    // 3️⃣ Save history
    await CropHistory.create({
      user: req.user._id,
      input: req.body,
      result: {
        mlResult,
        explanation
      }
    });

    // 4️⃣ Respond
    res.json({
      ml_result: mlResult,
      explanation
    });

  } catch (err) {
    console.error("HYBRID ERROR:", err.message);
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  }
}
