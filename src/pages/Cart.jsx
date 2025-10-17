// src/pages/Cart.jsx
import React, { useEffect, useState, useContext } from "react";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import CartContext from "../components/contexts/CartContext";
import { apiFetch } from "../lib/api";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setNumCartItems } = useContext(CartContext);

  const cart_code = localStorage.getItem("cart_code");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await apiFetch(`get_cart?cart_code=${cart_code}`);
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [cart_code]);

  // 🧠 Whenever local cart updates, update global Navbar count
  useEffect(() => {
    if (cart?.num_of_items >= 0) {
      setNumCartItems(cart.num_of_items);
    }
  }, [cart, setNumCartItems]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-cyan-300">Loading cart...</p>
    </div>
  );
  if (!cart) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-cyan-300">Cart not found.</p>
    </div>
  );

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900/30 to-slate-900"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl font-extrabold mb-12 text-center animate-slide-up">
          <span className="text-white">Shopping </span>
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Cart</span>
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-5">
            {cart.items.length > 0 ? (
              cart.items.map((item, index) => (
                <div key={item.id} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <CartItem item={item} setCart={setCart} />
                </div>
              ))
            ) : (
              <div className="glass-effect border border-violet-500/30 rounded-2xl p-16 text-center animate-slide-up">
                <p className="text-2xl text-cyan-300">Your cart is empty.</p>
              </div>
            )}
          </div>
          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <CartSummary numOfItems={cart.num_of_items} sumTotal={cart.sum_total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
