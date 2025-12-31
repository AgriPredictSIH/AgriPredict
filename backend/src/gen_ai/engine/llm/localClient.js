import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const LLM_BASE = process.env.LOCAL_LLM_URL || "http://localhost:11434";

export async function localChat(messages, model="llama3.2") {
  // messages: [{role:"user", content:"..."}]
  const payload = { model, messages };
  const r = await axios.post(`${LLM_BASE}/api/chat`, payload, { timeout: 60000 });
  // Ollama returns { id, model, object, created, choices: [{ message: { role, content } }] }
  return r.data.choices?.[0]?.message?.content ?? "";
}

export async function localEmbed(text, model="nomic-embed-text") {
  // Some Ollama setups expose an embedding endpoint; adjust if your environment differs.
  // If not available, you can integrate sentence-transformers server or use a fallback stub.
  try {
    const payload = { model, input: text };
    const r = await axios.post(`${LLM_BASE}/api/embed`, payload, { timeout: 60000 });
    // expected r.data.embeddings[0]
    return r.data?.embeddings?.[0] ?? null;
  } catch (e) {
    console.warn("Embedding call failed, falling back to random vector:", e.message);
    // fallback - deterministic pseudo-embedding (useful for dev)
    return Array.from({ length: 1536 }, (_, i) => Math.sin(i + text.length) * 0.001);
  }
}
