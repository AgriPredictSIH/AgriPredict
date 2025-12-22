import "dotenv/config";

import express from "express";
import cors from "cors";
import genaiRouter from "./gen_ai/api/genaiRouter.js";
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/db.js";


const app = express();

app.use(express.json());

app.use(cors({
  origin:["https://agri-predict-sandy.vercel.app","https://agripredict-022z.onrender.com"] 
}));
app.use(express.json());


await connectDB();

app.use("/api/genai", genaiRouter);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`GenAI backend running on ${process.env.PORT}`)
);
