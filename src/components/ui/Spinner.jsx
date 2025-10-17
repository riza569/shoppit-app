const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-violet-900/50 to-slate-900">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-cyan-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-b-fuchsia-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
      </div>
    </div>
  );
};

export default Spinner;
