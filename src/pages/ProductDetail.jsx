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
    return <div className="min-h-screen flex items-center justify-center"><div className="text-center text-2xl text-cyan-300">Product not found</div></div>;

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900/30 to-slate-900"></div>
      <div className="absolute top-40 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="flex flex-col md:flex-row items-start gap-12 max-w-7xl mx-auto glass-effect border border-violet-500/30 rounded-3xl shadow-2xl shadow-violet-500/20 p-8 lg:p-12 relative z-10 animate-slide-up">
        <div className="w-full md:w-1/2">
          <div className="relative glass-effect border border-violet-500/20 rounded-3xl p-8 shadow-inner">
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-3xl blur-xl"></div>
            <img
              src={`${BASE_URL}${
                product.image.startsWith("/")
                  ? product.image.substring(1)
                  : product.image
              }`}
              alt={product.name}
              className="relative w-full h-96 object-contain rounded-2xl transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">{product.name}</h1>
          <p className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            ${product.price}
          </p>
          <div className="border-t border-violet-500/30 pt-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Description</h3>
            <p className="text-cyan-100/80 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <button
            onClick={add_item}
            disabled={adding}
            className="group relative mt-8 px-10 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xl rounded-xl font-bold shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/80 transition-all duration-300 transform hover:-translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            {adding ? (
              <span className="relative">Product added to cart</span>
            ) : (
              <>
                <svg className="w-7 h-7 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="relative">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

      {product.similar_products && product.similar_products.length > 0 && (
        <div className="mt-24 max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-extrabold mb-16 text-center">
            <span className="text-white">You May Also </span>
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Like</span>
          </h2>
          <CardContainer products={product.similar_products} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
