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

    // ✅ Defensive parsing (CRITICAL)
    const content =
      res?.choices?.[0]?.message?.content ||
      res?.choices?.[0]?.delta?.content;

    if (!content) {
      console.error("INVALID LLM RESPONSE:", JSON.stringify(res, null, 2));
      throw new Error("Empty response from LLM");
    }

    return content;

  } catch (err) {
    console.error("LLM ERROR FULL:", err);
    throw err; // ❗ DO NOT MASK ERROR
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
