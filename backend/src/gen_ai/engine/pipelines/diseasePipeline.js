import { chat } from "../llm/llmFacade.js";

export async function explainDisease(diseaseResult) {
  return chat(`
You are an agricultural expert.
Explain this crop disease in simple farmer language.
Include:
- What the disease is
- How serious it is
- What to do immediately
- Prevention tips

DISEASE DATA:
${JSON.stringify(diseaseResult)}
`);
}
