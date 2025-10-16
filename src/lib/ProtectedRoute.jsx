// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthStatus } from "../lib/checkAuthStatus"; // 💡 Use the utility file
import Spinner from "../components/ui/Spinner"; // your loader component

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      // 🚀 Rely on the utility for all authorization logic (check, refresh, cleanup)
      const authorized = await checkAuthStatus();
      setIsAuthorized(authorized);
    };

    checkAuth();
  }, []); // Run only once on mount

  // 🌀 Show loader while checking
  if (isAuthorized === null) {
    return <Spinner />;
  }

  // ✅ Redirect to /login if unauthorized
  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
