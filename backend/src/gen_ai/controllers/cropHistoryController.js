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

    // 🔥 Normalize ML results BEFORE sending to frontend
    const normalizedHistory = history.map(item => {
      const obj = item.toObject();

      return {
        ...obj,
        result: {
          crop: normalizeMLResult(obj.result?.crop),
          explanation: obj.result?.explanation || ""
        }
      };
    });

    res.json(normalizedHistory);
  } catch (err) {
    console.error("CROP HISTORY ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
}
