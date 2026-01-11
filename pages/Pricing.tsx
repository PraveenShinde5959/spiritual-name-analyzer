
import React from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { NavigationRoute } from '../constants';

interface PricingProps {
  isRazorpayReady: boolean;
}

export const Pricing: React.FC<PricingProps> = ({ isRazorpayReady }) => {
  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate(NavigationRoute.Analyzer); // Redirect to Analyzer page to initiate analysis and payment
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl bg-purple-900/60 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-xl border border-purple-700 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold-100 mb-8 text-center">
        Unlock Your Full Potential
      </h2>

      <p className="text-lg text-gold-200 mb-10 text-center max-w-2xl">
        Access comprehensive spiritual insights, numerology scores, and personalized predictions with our full analysis report.
      </p>

      <div className="grid grid-cols-1 w-full max-w-md">
        {/* Paid Tier Card */}
        <div className="relative bg-gradient-to-br from-gold-400 to-yellow-300 p-8 rounded-xl shadow-2xl border-4 border-white flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-md">
            BEST VALUE
          </div>
          <h3 className="text-2xl font-serif font-bold text-purple-900 mb-4">Full Lifetime Report</h3>
          <p className="text-5xl font-bold text-purple-900 mb-6">₹99</p>
          <ul className="text-purple-800 text-left space-y-3 mb-8 flex-grow">
            <li className="flex items-center">
              <span className="text-purple-600 mr-2">★</span> Personalized Name Analysis
            </li>
            <li className="flex items-center">
              <span className="text-purple-600 mr-2">★</span> Business/Brand Energetic Alignment
            </li>
            <li className="flex items-center">
              <span className="text-purple-600 mr-2">★</span> In-depth Spiritual Insights
            </li>
            <li className="flex items-center">
              <span className="text-purple-600 mr-2">★</span> Advanced Numerological Breakdown
            </li>
            <li className="flex items-center">
              <span className="text-purple-600 mr-2">★</span> Personalized Actionable Guidance
            </li>
            <li className="flex items-center">
              <span className="text-purple-600 mr-2">★</span> <span className="font-bold">Lifetime PDF Download</span>
            </li>
          </ul>
          <Button onClick={handlePurchase} className="w-full text-lg mt-auto bg-purple-700 hover:bg-purple-800 text-white" disabled={!isRazorpayReady}>
            {isRazorpayReady ? 'Get Your Full Report' : 'Loading Payment Info...'}
          </Button>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};
