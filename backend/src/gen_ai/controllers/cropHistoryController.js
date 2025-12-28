import CropHistory from "../../models/CropHistory.js";
import { normalizeMLResult } from "../engine/utils/normalizeMLResult.js";

export async function getCropHistory(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const history = await CropHistory.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    const normalizedHistory = history.map(item => {
      const obj = item.toObject();

      const rawCrop =
        obj.result?.crop?.crop ||   // new format
        obj.result?.crop ||         // old format
        null;

      return {
        ...obj,
        result: {
          crop: normalizeMLResult(rawCrop),
          explanation: obj.result?.explanation || ""
        }
      };
    });

    res.json(normalizedHistory);
  } catch (err) {
    console.error("CROP HISTORY ERROR:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
}
