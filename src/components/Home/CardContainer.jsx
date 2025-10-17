import HomeCard from "./HomeCard";

const CardContainer = ({ products }) => {
  return (
    <div
      id="cards"
      className="relative w-full py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        <h2 className="text-5xl font-extrabold text-center mb-16 animate-slide-up">
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Discover Our</span>
          <br />
          <span className="text-white">Products</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={product.id} style={{animationDelay: `${index * 0.1}s`}}>
              <HomeCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
