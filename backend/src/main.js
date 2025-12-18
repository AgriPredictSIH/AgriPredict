import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import genaiRouter from "./gen_ai/api/genaiRouter.js";
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/db.js";
dotenv.config();


const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

await connectDB();

app.use("/api/genai", genaiRouter);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`GenAI backend running on ${process.env.PORT}`)
);
