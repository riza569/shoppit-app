import { useEffect, useState } from "react";
import CartContext from "../components/contexts/CartContext";
import BASE_URL from "../lib/baseurl";
const CartProvider = ({ children }) => {
  const [numCartItems, setNumCartItems] = useState(0);
  useEffect(() => {
    const cart_code = localStorage.getItem("cart_code");
    if (cart_code) {
      fetch(`${BASE_URL}get_cart_stat?cart_code=${cart_code}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setNumCartItems(data.num_of_items || 0);
        })
        .catch((err) => console.error("Error fetching cart stats:", err));
    }
  }, []);

  return (
    <CartContext.Provider value={{ numCartItems, setNumCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
