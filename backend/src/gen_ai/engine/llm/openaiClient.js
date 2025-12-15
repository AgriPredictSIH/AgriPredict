import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("❌ OPENROUTER_API_KEY missing in .env");
}

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENROUTER_BASE_URL,
  defaultHeaders: {
    "HTTP-Referer": process.env.OPENROUTER_SITE_URL,
    "X-Title": process.env.OPENROUTER_SITE_NAME
  }
});
