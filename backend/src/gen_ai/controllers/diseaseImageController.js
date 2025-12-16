import { detectDiseaseFromImage } from "../services/mlService.js";
import { explainDisease } from "../engine/pipelines/diseasePipeline.js";

export async function diseaseImageController(req, res) {
  try {
    const { crop } = req.body;
    const imageFile = req.file;

    const mlResult = await detectDiseaseFromImage({
      crop,
      filename: imageFile.filename
    });

    const explanation = await explainDisease(mlResult);

    res.json({
      ml_result: mlResult,
      explanation
    });
  } catch (err) {
    console.error("IMAGE DISEASE ERROR:", err);
    res.status(500).json({ error: "Image disease detection failed" });
  }
}
