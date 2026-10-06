import { ADMIN_EMAIL } from "./config";

const TOKEN_KEY = "accessToken";

export const isAuthed = () => Boolean(localStorage.getItem(TOKEN_KEY));

export function login(email) {
  if (String(email).trim().toLowerCase() !== ADMIN_EMAIL) return false;
  localStorage.setItem(TOKEN_KEY, "1");
  localStorage.setItem("UserId", "1");
  localStorage.setItem("adminEmail", ADMIN_EMAIL);
  return true;
}

export function logout() {
  [TOKEN_KEY, "UserId", "adminEmail"].forEach((k) => localStorage.removeItem(k));
}

export const currentEmail = () => localStorage.getItem("adminEmail") || ADMIN_EMAIL;
