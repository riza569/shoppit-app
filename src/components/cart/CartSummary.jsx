import { checkAuthStatus } from "/src/lib/checkAuthStatus.js";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ sumTotal, numOfItems }) => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const isLoggedIn = await checkAuthStatus();

    if (!isLoggedIn) {
      alert("Please login before checking out!");
      navigate("/login");
    } else {
      alert("✅ You are authorized! Proceeding to checkout...");
      // navigate("/checkout"); // <-- use this when you actually make a page
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="font-semibold text-lg">Cart Summary</h3>
      <p>Items: {numOfItems}</p>
      <p>Total: ₹{sumTotal}</p>
      <button
        onClick={handleCheckout}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
