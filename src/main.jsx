import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./lib/Router.jsx";

// Import existing provider and the new AuthProvider
import CartProvider from "./providers/CartProvider.jsx";
import { AuthProvider } from "./components/contexts/AuthContext.jsx"; // 👈 New Import

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 1. Wrap the entire application in AuthProvider. 
      2. This allows all components (Navbar, Login, ProtectedRoute) 
         to access user state and authentication logic.
    */}
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
