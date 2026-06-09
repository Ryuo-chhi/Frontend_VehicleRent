import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-[12rem] font-black text-slate-100 leading-none tracking-tighter select-none">
        404
      </h1>
      <div className="-mt-16 relative z-10">
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
          Lost in transit?
        </h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
          The page you're looking for seems to have hit a roadblock or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <Link 
            to="/"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
        
        <p className="mt-12 text-sm font-bold text-slate-400 uppercase tracking-widest">
          Redirecting to home in {countdown}s
        </p>
      </div>
    </div>
  );
};

export default NotFound;
