import api from "./axiosInstance";

/* =========================
   CROP HYBRID
========================= */
export async function cropAPI(data) {
  const res = await api.post("/genai/hybrid", data);
  return res.data; // ✅ IMPORTANT
}

/* =========================
   CROP HISTORY
========================= */
export async function getCropHistory() {
  const res = await api.get("/genai/crop-history");
  return res.data;
}

/* =========================
   AI CHAT
========================= */
export async function chatAPI(message) {
  const res = await api.post("/genai/chat", { message });
  return res.data;
}

/* =========================
   DISEASE (TEXT)
========================= */
export async function diseaseAPI(data) {
  const res = await api.post("/genai/disease", data);
  return res.data;
}

/* =========================
   DISEASE (IMAGE)
========================= */
export async function diseaseImageAPI(formData) {
  const res = await api.post("/genai/disease-image", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
}
