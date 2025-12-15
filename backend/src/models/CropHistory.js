import mongoose from "mongoose";

const cropHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  input: Object,
  result: Object
}, { timestamps: true });

export default mongoose.model("CropHistory", cropHistorySchema);
