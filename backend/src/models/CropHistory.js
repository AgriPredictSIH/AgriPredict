import mongoose from "mongoose";

const cropHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    input: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    result: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("CropHistory", cropHistorySchema);
