import api from "./axiosInstance";

/* REGISTER */
export async function registerUser(data) {
  const res = await api.post("/auth/register", data);
  return res.data; // ✅ THIS WAS MISSING
}

/* LOGIN */
export async function loginUser(data) {
  const res = await api.post("/auth/login", data);
  return res.data;
}
