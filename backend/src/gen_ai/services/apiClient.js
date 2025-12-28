const ML_BASE_URL = "https://agripredictml-1.onrender.com/api"; // ✅ IMPORTANT
export async function apiRequest(endpoint, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${ML_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options,
      signal: controller.signal
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`ML error ${res.status}: ${text}`);
    }

    return await res.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("ML service timeout");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
