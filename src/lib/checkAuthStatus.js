// src/lib/checkAuthStatus.js
import { jwtDecode } from "jwt-decode";
import BASE_URL from "./baseurl";

/**
 * Checks the current authentication status and returns the decoded user payload
 * if authorized, or null otherwise.
 * @returns {Promise<object | null>} Decoded user payload (e.g., { user_id, username, exp }) or null.
 */
export async function checkAuthStatus() {
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  if (!access || typeof access !== "string" || access.length === 0) {
    return null;
  }

  try {
    let decoded = jwtDecode(access);
    const current_time = Date.now() / 1000;

    if (decoded.exp < current_time) {
      // Expired access token → try refreshing
      if (refresh) {
        const res = await fetch(`${BASE_URL}token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        });

        if (!res.ok) {
          console.warn("Refresh token invalid or expired. Logging out.");
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          return null;
        }

        const data = await res.json();
        localStorage.setItem("access", data.access);

        // Decode the newly acquired access token
        decoded = jwtDecode(data.access);
        return decoded; // Return the new, valid user payload
      }

      // No refresh token available
      localStorage.removeItem("access");
      return null;
    }

    // ✅ Token still valid
    return decoded;
  } catch (err) {
    console.error("Token check failed (Invalid JWT format):", err);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    return null;
  }
}
