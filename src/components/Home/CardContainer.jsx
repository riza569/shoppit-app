import HomeCard from "./HomeCard";

const CardContainer = ({ products }) => {
  return (
    // Full width gradient wrapper
    <div
      id="cards"
      className="bg-gradient-to-r from-purple-100 via-pink-100 to-white w-full py-10"
    >
      {/* Inner container to constrain max width */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <HomeCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
