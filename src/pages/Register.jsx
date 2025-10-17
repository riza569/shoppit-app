import React from "react";

const Register = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900/50 to-slate-900"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="relative glass-effect border border-violet-500/30 p-10 rounded-3xl shadow-2xl shadow-violet-500/20 w-full max-w-md animate-slide-up">
        <h2 className="text-4xl font-extrabold text-center mb-8">
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Create Account</span>
        </h2>
        <p className="text-center text-cyan-300 text-lg mb-8">Registration page coming soon</p>
      </div>
    </div>
  );
};

export default Register;
