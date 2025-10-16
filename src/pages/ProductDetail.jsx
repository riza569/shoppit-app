import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CardContainer from "../components/Home/CardContainer";
import Spinner from "../components/ui/Spinner";
import CartContext from "../components/contexts/CartContext";
import { apiFetch } from "../lib/api";
import BASE_URL from "../lib/baseurl";
const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { setNumCartItems } = useContext(CartContext);

  let cart_code = localStorage.getItem("cart_code");

  // ✅ Fetch product details first
  useEffect(() => {
    apiFetch(`product_detail/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  // ✅ Fetch product_in_cart only after product is loaded
  useEffect(() => {
    if (product && product.id) {
      apiFetch(
        `product_in_cart?cart_code=${cart_code}&product_id=${product.id}`
      )
        .then((res) => res.json())
        .then((data) => setAdding(data.product_in_cart)) // expects backend to return { in_cart: true/false }
        .catch((err) => console.error(err.message));
    }
  }, [cart_code, product]);

  // ✅ Add item function
  const add_item = async () => {
    if (!product) return;

    const newItem = { cart_code: cart_code, product_id: product.id };

    try {
      setAdding(true);
      const res = await apiFetch("add_item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error(`HTTP ERROR! STATUS: ${res.status}`);

      const data = await res.json();
      console.log("✅ Item added successfully:", data);
      alert("✅ Added to cart successfully!");
      setNumCartItems((curr) => curr + 1);
    } catch (error) {
      console.error("❌ Error adding item:", error);
      alert("❌ Failed to add item to cart");
      setAdding(false);
    }
  };

  if (loading) return <Spinner />;
  if (!product)
    return <div className="text-center py-20 text-xl">Product not found</div>;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-20">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <img
          src={`${BASE_URL}${product.image}`}
          alt={product.name}
          className="w-full md:w-1/2 h-80 md:h-96 object-contain rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl mt-4 font-semibold text-purple-600">
            ${product.price}
          </p>
          <p className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* ✅ Add to Cart Button */}
          <button
            onClick={add_item}
            disabled={adding}
            className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg rounded-lg shadow-md transition disabled:opacity-50"
          >
            {adding ? "Product added to cart" : "🛒 Add to Cart"}
          </button>
        </div>
      </div>

      {product.similar_products && product.similar_products.length > 0 && (
        <div className="mt-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Related Products
          </h2>
          <CardContainer products={product.similar_products} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
