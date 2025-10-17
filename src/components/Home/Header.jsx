const Header = () => {
  return (
    <header className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900/50 to-slate-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        {/* Text Content */}
        <div className="text-center lg:text-left max-w-2xl space-y-8 animate-slide-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
            Welcome to <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-neon-pulse">Riza's Shop</span>
          </h1>
          <p className="text-cyan-100 text-xl sm:text-2xl leading-relaxed">
            Discover the latest trends with our curated collection of futuristic products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#cards"
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-10 py-4 rounded-xl font-bold shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/80 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Shop Now</span>
              <svg className="w-6 h-6 relative group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-10 lg:mt-0 relative animate-float">
          <div className="absolute -inset-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl blur-3xl opacity-30 animate-pulse-glow"></div>
          <div className="relative glass-effect p-2 rounded-3xl border-2 border-violet-500/30">
            <img
              src="/hero.jpg"
              alt="Ecommerce Hero"
              className="relative rounded-2xl shadow-2xl w-full max-w-md lg:max-w-lg transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
