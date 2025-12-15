import CropHistory from "../models/CropHistory.js";
export async function getCropHistory(req, res) {
  const history = await CropHistory.find({
    user: req.user._id
  }).sort({ createdAt: -1 });

  res.json(history);
}
