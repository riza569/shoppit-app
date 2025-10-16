// src/utils/api.js
import { jwtDecode } from "jwt-decode";
import BASE_URL from "./baseurl";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("access");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // ✅ Check if the token is a non-empty string before decoding
  if (token && typeof token === "string" && token.length > 0) {
    try {
      const decoded = jwtDecode(token);
      const expiry = decoded.exp;
      const now = Date.now() / 1000;

      if (expiry > now) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        // Token is expired, but we allow the request to proceed without the header.
        // The checkAuthStatus is responsible for the actual auto-refresh flow.
        console.warn(
          "Token expired - Request will proceed without authorization header."
        );
      }
    } catch (err) {
      // 🚨 Clear storage if decoding fails (malformed token)
      console.error("Error decoding JWT in apiFetch:", err);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }
  }

  // Regular fetch
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response; // return raw Response object
}
