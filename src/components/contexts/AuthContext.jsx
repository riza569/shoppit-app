import { createContext, useState, useEffect } from "react";
import { checkAuthStatus } from "../../lib/checkAuthStatus";

// Create the context
const AuthContext = createContext({
  user: null, // Holds decoded token payload or user object
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  // We'll store the decoded user object here. If null, the user is logged out.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Run once on app load to check initial auth status
  useEffect(() => {
    const loadUser = async () => {
      // checkAuthStatus now returns the user payload or null
      const userData = await checkAuthStatus();
      setUser(userData);
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = (userData) => {
    // Called by Login.jsx after successful token storage
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    // Optional: Force a page reload to ensure all states are reset
    window.location.href = "/";
  };

  // Determine isAuthenticated based on the presence of the user object
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
