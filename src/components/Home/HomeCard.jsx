import { Link } from "react-router-dom";
import BASE_URL from "../../lib/baseurl";

const HomeCard = ({ product }) => {
  const imagePath = product.image;

  // Create the clean image URL using a safe function (or inline logic)
  const cleanImagePath = imagePath.startsWith("/")
    ? imagePath.substring(1)
    : imagePath;

  // The combined URL:
  const finalImageUrl = `${BASE_URL}${cleanImagePath}`;
  return (
    <Link to={`/products/${product.slug}`} className="group">
      <div className="glass-effect border border-violet-500/30 rounded-2xl overflow-hidden hover:border-violet-500/60 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-violet-500/30 animate-slide-up">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <img
            src={finalImageUrl}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors duration-300">
            {product.name}
          </h2>
          <p className="text-cyan-200/70 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between pt-4 border-t border-violet-500/30">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              ${product.price}
            </span>
            <button className="group/btn relative bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/60 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
