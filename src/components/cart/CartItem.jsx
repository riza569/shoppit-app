import React, { useState, useContext, createContext } from "react";
import { apiFetch } from "../../lib/api";
import BASE_URL from "../../lib/baseurl";

// Define CartContext within the file to resolve the import error.
// In a real multi-file app, this would be in its own file and imported.
const CartContext = createContext({
  setNumCartItems: () => {}, // Provide a dummy function as a default
});

const CartItem = ({ item, setCart }) => {
  // FIX: Add a guard clause to handle cases where 'item' or 'item.product' might be undefined.
  if (!item || !item.product) {
    // This prevents the component from crashing if the item data is not yet available or is invalid.
    return null;
  }

  const [quantity, setQuantity] = useState(Number(item.quantity) || 1);
  const [updating, setUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { setNumCartItems } = useContext(CartContext);

  const updateCartQuantity = async () => {
    try {
      setUpdating(true);

      const updatedItem = {
        quantity: Number(quantity) || 1,
        item_id: item.id,
      };

      const res = await apiFetch(`update_quantity/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      if (!res.ok) throw new Error("Failed to update quantity");

      const data = await res.json();
      const updatedQty = Number(data.quantity) || Number(quantity) || 1;

      // ✅ Instantly update local cart state
      setCart((prevCart) => {
        const updatedItems = prevCart.items.map((cartItem) => {
          if (cartItem.id === item.id) {
            const price = Number(cartItem.product.price) || 0;
            const newTotal = updatedQty * price;

            return {
              ...cartItem,
              quantity: updatedQty,
              total: newTotal,
            };
          }
          return cartItem;
        });

        // ✅ Recalculate totals safely
        const num_of_items = updatedItems.reduce(
          (sum, i) => sum + (Number(i.quantity) || 0),
          0
        );
        const sum_total = updatedItems.reduce(
          (sum, i) =>
            sum + (Number(i.product.price) || 0) * (Number(i.quantity) || 0),
          0
        );

        // ✅ Update navbar instantly
        setNumCartItems(num_of_items);

        return {
          ...prevCart,
          items: updatedItems,
          num_of_items,
          sum_total,
        };
      });

      console.log("Cart updated locally ✅");
    } catch (err) {
      console.error("Error updating cart:", err);
    } finally {
      setUpdating(false);
    }
  };

  // --- MODIFIED: Handle item deletion with window.confirm ---
  const handleDeleteItem = async () => {
    // Use the browser's built-in confirmation dialog
    if (
      window.confirm(
        "Are you sure you want to remove this item from your cart?"
      )
    ) {
      setIsDeleting(true);
      try {
        const res = await apiFetch(`delete_cart_item/`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item_id: item.id }),
        });

        if (res.status !== 204) {
          throw new Error(`Failed to delete item. Status: ${res.status}`);
        }

        // ✅ Update local cart state after successful deletion
        setCart((prevCart) => {
          const updatedItems = prevCart.items.filter(
            (cartItem) => cartItem.id !== item.id
          );

          // Recalculate totals
          const num_of_items = updatedItems.reduce(
            (sum, i) => sum + (Number(i.quantity) || 0),
            0
          );
          const sum_total = updatedItems.reduce(
            (sum, i) =>
              sum + (Number(i.product.price) || 0) * (Number(i.quantity) || 0),
            0
          );

          // Update navbar count
          setNumCartItems(num_of_items);

          return {
            ...prevCart,
            items: updatedItems,
            num_of_items,
            sum_total,
          };
        });
        console.log("Item removed successfully ✅");
      } catch (err) {
        console.error("Error deleting item:", err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // ✅ Always display safe numeric subtotal
  const subtotal = (
    (Number(item.product.price) || 0) * (Number(item.quantity) || 0)
  ).toFixed(2);
  const imagePath = item.product.image;

  // Create the clean image URL using a safe function (or inline logic)
  const cleanImagePath = imagePath.startsWith("/")
    ? imagePath.substring(1)
    : imagePath;

  // The combined URL:
  const finalImageUrl = `${BASE_URL}${cleanImagePath}`;
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center glass-effect border border-violet-500/30 rounded-2xl shadow-lg p-6 hover:border-violet-500/50 transition-all duration-300">
      <div className="flex items-center gap-6 mb-4 sm:mb-0 w-full sm:w-auto">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl blur opacity-30"></div>
          <img
            src={finalImageUrl}
            alt={item.product.name}
            className="relative w-24 h-24 object-cover rounded-xl border border-violet-500/30"
          />
        </div>
        <div>
          <h3 className="font-bold text-xl text-white mb-2">{item.product.name}</h3>
          <p className="text-cyan-300 text-sm">${item.product.price} each</p>
          <p className="font-semibold text-lg bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mt-1">Subtotal: ${subtotal}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-20 glass-effect border border-violet-500/30 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
          />
          <button
            onClick={updateCartQuantity}
            disabled={updating || isDeleting}
            className={`${
              updating
                ? "bg-slate-700 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
            } text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-violet-500/50 transform hover:-translate-y-0.5`}
          >
            {updating ? "..." : "Update"}
          </button>
        </div>
        <button
          onClick={handleDeleteItem}
          disabled={updating || isDeleting}
          className="text-sm font-medium text-red-400 hover:text-red-300 disabled:text-slate-600 transition-colors"
        >
          {isDeleting ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
