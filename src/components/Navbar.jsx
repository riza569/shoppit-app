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
    "text-gray-800 hover:text-purple-700 font-semibold transition-colors duration-300";

  const AuthLinks = (
    <>
      {/* Show Logout and Username if authenticated */}
      <div className="flex items-center space-x-4">
        {displayUsername && (
          <span className="text-sm font-medium text-gray-700 px-3 py-1 rounded-full bg-purple-100">
            {/* Now displaying the actual username */}
            Hello, {displayUsername}
          </span>
        )}
        <button
          onClick={logout}
          className="text-red-600 hover:text-red-800 font-bold transition-colors duration-300 bg-white py-1 px-3 rounded-lg shadow-sm"
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
    <nav className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold text-purple-700 hover:text-purple-900 transition-colors"
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
              className="relative text-gray-800 hover:text-purple-700 transition-colors duration-300"
            >
              🛒
              {numCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {numCartItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none px-3 py-2 rounded-md text-gray-800 bg-white hover:bg-purple-100 transition-colors"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div
            className="sm:hidden mt-2 bg-white rounded-md p-4 shadow-md space-y-2"
            onClick={() => setIsOpen(false)}
          >
            <Link
              to="/"
              className="block text-gray-800 hover:text-purple-700 transition-colors duration-300"
            >
              Home
            </Link>
            <a
              href="#cards"
              className="block text-gray-800 hover:text-purple-700 transition-colors duration-300"
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
                  className="block w-full text-left text-red-600 hover:text-red-800 font-bold transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-800 hover:text-purple-700 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-gray-800 hover:text-purple-700 transition-colors duration-300"
                >
                  Register
                </Link>
              </>
            )}

            {/* 🛒 Cart (mobile) */}
            <Link
              to="/cart"
              className="block relative text-gray-800 hover:text-purple-700 transition-colors duration-300"
            >
              🛒 Cart
              {numCartItems > 0 && (
                <span className="absolute top-0 right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {numCartItems}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
