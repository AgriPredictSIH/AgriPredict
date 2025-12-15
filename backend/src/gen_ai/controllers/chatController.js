import { chat } from "../engine/llm/llmFacade.js";

export async function chatController(req, res) {
  try {
    console.log("BODY:", req.body);

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    const answer = await chat(message);
    res.json({ answer });

  } catch (err) {
    console.error("CHAT CONTROLLER ERROR:", err.message);
    res.status(500).json({ error: "AI service unavailable" });
  }
}
