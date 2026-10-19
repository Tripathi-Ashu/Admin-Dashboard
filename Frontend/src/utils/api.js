const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "mandi_token";
const FARMER_KEY = "mandi_farmer";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export function getFarmer() {
  try {
    return JSON.parse(localStorage.getItem(FARMER_KEY));
  } catch {
    return null;
  }
}

export function saveFarmer(farmer) {
  localStorage.setItem(FARMER_KEY, JSON.stringify(farmer));
  window.dispatchEvent(new Event("mandi-auth"));
}

export function saveSession(token, farmer) {
  localStorage.setItem(TOKEN_KEY, token);
  saveFarmer(farmer);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(FARMER_KEY);
  window.dispatchEvent(new Event("mandi-auth"));
}

export async function api(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
  } catch {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  const data = await res.json().catch(() => ({}));

  if (res.status === 401 && token) {
    clearSession();
    window.location.href = "/login";
  }
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
