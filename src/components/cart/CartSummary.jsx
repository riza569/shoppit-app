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
    <div className="glass-effect border border-violet-500/30 rounded-2xl shadow-2xl p-8 h-fit sticky top-24">
      <h3 className="font-bold text-3xl text-white mb-8 text-center">Order Summary</h3>
      <div className="space-y-6 mb-8">
        <div className="flex justify-between items-center pb-6 border-b border-violet-500/30">
          <span className="text-cyan-300 text-lg">Items:</span>
          <span className="font-bold text-white text-xl">{numOfItems}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-white">Total:</span>
          <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">${sumTotal}</span>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        className="group relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/80 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="relative">Proceed to Checkout</span>
      </button>
    </div>
  );
};

export default CartSummary;
