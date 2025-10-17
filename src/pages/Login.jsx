import React, { useState, useContext } from "react";
import { apiFetch } from "../lib/api";
import { jwtDecode } from "jwt-decode"; // Need this to decode the token for the context
import AuthContext from "../components/contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get the login function from the context
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiFetch("token/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.detail || "Invalid credentials. Please try again.";
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // 1. Store tokens locally
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // 2. Decode the new token and update the global context state
      const userData = jwtDecode(data.access);
      login(userData); // Set user in AuthContext

      alert("Login successful!");

      // 3. Redirect to the home page
      window.location.href = "/";
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message || "An unexpected server error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900/50 to-slate-900"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <form
        onSubmit={handleSubmit}
        className="relative glass-effect border border-violet-500/30 p-10 rounded-3xl shadow-2xl shadow-violet-500/20 w-full max-w-md animate-slide-up"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8">
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Welcome Back</span>
        </h2>

        {error && (
          <div className="glass-effect border border-red-500/50 text-red-300 px-4 py-3 rounded-xl mb-6 text-center font-medium">{error}</div>
        )}

        <div className="mb-6">
          <label className="block mb-3 text-cyan-300 font-semibold">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 glass-effect border border-violet-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-white placeholder-cyan-300/50"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-8">
          <label className="block mb-3 text-cyan-300 font-semibold">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 glass-effect border border-violet-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-white placeholder-cyan-300/50"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 rounded-xl font-bold shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/80 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative">{loading ? "Logging in..." : "Login"}</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
