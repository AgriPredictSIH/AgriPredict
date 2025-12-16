import CropHistory from "../../models/CropHistory.js";

export async function getCropHistory(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const history = await CropHistory.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    console.error("CROP HISTORY ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
}
