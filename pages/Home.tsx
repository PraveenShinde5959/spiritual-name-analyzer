
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { NavigationRoute } from '../constants';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleAnalyzeNow = () => {
    navigate(NavigationRoute.Analyzer);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 md:p-8 max-w-4xl mx-auto min-h-[calc(100vh-160px)]">
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6 animate-fade-in-up">
        Discover the Hidden Power of Your Name & Brand
      </h1>
      <p className="text-lg md:text-2xl font-sans text-gold-200 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        Get spiritual insights, lucky letters, and numerology scores instantly.
      </p>
      <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <Button onClick={handleAnalyzeNow} className="text-xl px-10 py-4">
          Analyze Now
        </Button>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
