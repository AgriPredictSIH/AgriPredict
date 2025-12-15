import { openaiClient } from "./openaiClient.js";

/* =========================
   CORE CHAT
========================= */
export async function chat(prompt) {
  try {
    const res = await openaiClient.chat.completions.create({
      model: process.env.OPENROUTER_MODEL,
      messages: [{ role: "user", content: prompt }]
    });

    return res.choices[0].message.content;
  } catch (err) {
    console.error("LLM ERROR:", err.message);
    throw new Error("LLM service failed");
  }
}

/* =========================
   JSON RESPONSE
========================= */
export async function chatJSON(prompt) {
  const text = await chat(`${prompt}\nReturn valid JSON only.`);
  try {
    return JSON.parse(text);
  } catch {
    return { error: "Invalid JSON from AI" };
  }
}

/* =========================
   TRANSLATION
========================= */
export async function translate(text, lang) {
  return chat(`Translate the following text to ${lang}:\n${text}`);
}

/* =========================
   ML EXPLANATION
========================= */
export async function explainML(result) {
  return chat(
    `Explain this ML output in simple farmer-friendly language:\n${JSON.stringify(result)}`
  );
}

/* =========================
   LOCALIZED ADVICE
========================= */
export async function localizedAdvice(data) {
  return chat(
    `Give step-by-step localized farming advice:\n${JSON.stringify(data)}`
  );
}

/* =========================
   AGENT REASONING
========================= */
export async function agentReason(query) {
  return chat(`Think step by step like an agricultural expert:\n${query}`);
}
