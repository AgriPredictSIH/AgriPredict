
/* =========================
   CORE CHAT
========================= */
export async function chat(prompt) {
  try {
    const response = await fetch(
      `${process.env.OPENROUTER_BASE_URL}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.OPENROUTER_SITE_URL,
          "X-Title": process.env.OPENROUTER_SITE_NAME
        },
        body: JSON.stringify({
          model: process.env.OPENROUTER_MODEL,
          messages: [{ role: "user", content: prompt }]
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter error: ${errText}`);
    }

    const data = await response.json();

    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No content returned from OpenRouter");
    }

    return content;

  } catch (err) {
    console.error("OPENROUTER LLM ERROR:", err);
    throw err;
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
