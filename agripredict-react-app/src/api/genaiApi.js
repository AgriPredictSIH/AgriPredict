const BASE = "http://localhost:5001/api/genai";

/* AI Chat */
export async function chatAPI(message) {
  const res = await fetch(`${BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  return res.json();
}

export async function cropAPI(data, token) {
  const res = await fetch("http://localhost:5001/api/genai/hybrid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return res.json();
}




export async function getCropHistory(token) {
  const res = await fetch(
    `${BASE}/crop-history`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.json();
}

