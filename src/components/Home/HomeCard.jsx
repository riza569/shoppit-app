import { Link } from "react-router-dom";
import BASE_URL from "../../lib/baseurl";

const HomeCard = ({ product }) => {
  return (
    <Link to={`/products/${product.slug}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <img
          src={`h${BASE_URL}${product.image}`}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h2>
          <p className="text-gray-600 text-sm my-2">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-purple-600 font-bold text-lg">
              ${product.price}
            </span>
            <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
