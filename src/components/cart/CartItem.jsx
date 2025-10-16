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

  return (
    <div className="flex justify-between items-center border rounded-lg shadow-sm p-3 mb-3 bg-white">
      <div className="flex items-center gap-4">
        <img
          src={`${BASE_URL}${
            item.product.image.startsWith("/")
              ? item.product.image.substring(1)
              : item.product.image
          }`}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
          <p className="text-gray-500 text-sm">₹{item.product.price} each</p>
          <p className="font-medium text-gray-700">Subtotal: ₹{subtotal}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-16 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={updateCartQuantity}
            disabled={updating || isDeleting}
            className={`${
              updating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-3 py-1 rounded transition`}
          >
            {updating ? "..." : "Update"}
          </button>
        </div>
        {/* --- Remove Button now calls handleDeleteItem directly --- */}
        <button
          onClick={handleDeleteItem}
          disabled={updating || isDeleting}
          className="text-sm font-medium text-red-600 hover:text-red-800 disabled:text-gray-400"
        >
          {isDeleting ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
