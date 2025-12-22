import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  console.log("🔍 Mongo URI exists:", !!uri);

  if (!uri) {
    throw new Error("❌ MONGO_URI missing in .env");
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
