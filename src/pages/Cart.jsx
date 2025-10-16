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

  if (loading) return <p>Loading cart...</p>;
  if (!cart) return <p>Cart not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        {cart.items.length > 0 ? (
          cart.items.map((item) => (
            <CartItem key={item.id} item={item} setCart={setCart} />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <CartSummary numOfItems={cart.num_of_items} sumTotal={cart.sum_total} />
    </div>
  );
};

export default Cart;
