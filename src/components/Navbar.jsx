import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../components/contexts/CartContext";
import AuthContext from "../components/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { numCartItems } = useContext(CartContext);

  // Get user state and logout function from AuthContext
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  // Use the 'username' field from the JWT payload.
  // Fall back to user.user_id if the username claim is somehow missing (until the Django fix is deployed).
  const displayUsername = user ? user.username || user.user_id : null;

  const navLinkClasses =
    "text-cyan-300 hover:text-violet-400 font-semibold transition-all duration-300 hover:scale-110";

  const AuthLinks = (
    <>
      {/* Show Logout and Username if authenticated */}
      <div className="flex items-center space-x-4">
        {displayUsername && (
          <span className="text-sm font-medium text-cyan-300 px-4 py-2 rounded-full glass-effect border border-violet-500/30">
            Hello, {displayUsername}
          </span>
        )}
        <button
          onClick={logout}
          className="text-white font-semibold transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 py-2 px-5 rounded-lg shadow-lg hover:shadow-red-500/50 transform hover:-translate-y-1 hover:scale-105"
        >
          Logout
        </button>
      </div>
    </>
  );

  const GuestLinks = (
    <>
      {/* Show Login and Register if not authenticated */}
      <Link to="/login" className={navLinkClasses}>
        Login
      </Link>
      <Link to="/register" className={navLinkClasses}>
        Register
      </Link>
    </>
  );

  return (
    <nav className="glass-effect shadow-2xl shadow-violet-500/20 sticky top-0 z-50 border-b border-violet-500/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent hover:scale-110 transition-all duration-300 animate-neon-pulse"
          >
            Riza
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex space-x-6 items-center">
            <Link to="/" className={navLinkClasses}>
              Home
            </Link>
            <a href="#cards" className={navLinkClasses}>
              Products
            </a>

            {/* Conditional Auth Rendering */}
            {isAuthenticated ? AuthLinks : GuestLinks}

            {/* 🛒 Cart Icon */}
            <Link
              to="/cart"
              className="relative text-cyan-300 hover:text-violet-400 transition-all duration-300 text-2xl hover:scale-110"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {numCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold shadow-lg shadow-pink-500/50 animate-pulse-glow">
                  {numCartItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none px-3 py-2 rounded-lg text-cyan-300 glass-effect hover:bg-violet-500/20 transition-all duration-300 border border-violet-500/30"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div
            className="sm:hidden mt-2 glass-effect rounded-xl p-4 shadow-2xl border border-violet-500/30 space-y-2 animate-slide-up"
            onClick={() => setIsOpen(false)}
          >
            <Link
              to="/"
              className="block text-cyan-300 hover:text-violet-400 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-violet-500/20"
            >
              Home
            </Link>
            <a
              href="#cards"
              className="block text-cyan-300 hover:text-violet-400 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-violet-500/20"
            >
              Products
            </a>

            {/* Conditional Auth Rendering (Mobile) */}
            {isAuthenticated ? (
              <>
                {displayUsername && (
                  <span className="block text-sm font-medium text-gray-700 py-1">
                    Hello, {displayUsername}
                  </span>
                )}
                <button
                  onClick={logout}
                  className="block w-full text-left text-white font-semibold transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-500 py-2 px-3 rounded-lg hover:shadow-lg hover:shadow-red-500/50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-cyan-300 hover:text-violet-400 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-violet-500/20"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-cyan-300 hover:text-violet-400 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-violet-500/20"
                >
                  Register
                </Link>
              </>
            )}

            {/* 🛒 Cart (mobile) */}
            <Link
              to="/cart"
              className="block relative text-cyan-300 hover:text-violet-400 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-violet-500/20"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
                {numCartItems > 0 && (
                  <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-lg shadow-pink-500/50 animate-pulse-glow">
                    {numCartItems}
                  </span>
                )}
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
