const Header = () => {
  return (
    <header className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 h-screen flex items-center">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Welcome to <span className="text-purple-600">Riza's Shop</span>
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl mb-8">
            Discover the latest trends with our curated collection of products.
          </p>
          <a
            href="#cards"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300 font-semibold"
          >
            Shop Now
          </a>
        </div>

        {/* Hero Image */}
        <div className="mt-10 lg:mt-0">
          <img
            src="/src/hero.jpg"
            alt="Ecommerce Hero"
            className="rounded-xl shadow-2xl w-full max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
