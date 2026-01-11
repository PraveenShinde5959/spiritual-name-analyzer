
import React from 'react';

export const SpiritualBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Soft gradient base */}
      <div className="absolute inset-0 bg-spiritual-gradient opacity-80 animate-gradient-flow"></div>

      {/* Mandala pattern - subtle and large */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-spiritual-pattern-1 opacity-10 animate-fade-in"
        style={{ animationDelay: '0.5s', backgroundSize: '150%', backgroundPosition: 'center' }}
      ></div>

      {/* Lotus/Aura glow - central, shimmering */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)' }}
      >
        <div className="w-96 h-96 bg-gradient-to-br from-gold-300 to-yellow-200 rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse-light transform scale-150"></div>
      </div>

      {/* Floating particles/lights */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-0 animate-float-glow"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              filter: 'blur(1px)',
            }}
          ></div>
        ))}
      </div>

      {/* Tailwind keyframes for animations */}
      <style jsx>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 0.1; }
        }
        @keyframes pulse-light {
          0%, 100% { transform: scale(1.5) opacity(0.1); }
          50% { transform: scale(1.6) opacity(0.2); }
        }
        @keyframes float-glow {
          0% { transform: translateY(0) translateX(0) scale(0.8); opacity: 0; }
          25% { opacity: 0.4; }
          50% { transform: translateY(-50vh) translateX(20vw) scale(1.2); opacity: 0.6; }
          75% { opacity: 0.4; }
          100% { transform: translateY(-100vh) translateX(40vw) scale(0.8); opacity: 0; }
        }

        .animate-gradient-flow {
          animation: gradient-flow 15s ease infinite alternate;
        }
        .animate-fade-in {
          animation: fade-in 2s ease-out forwards;
        }
        .animate-pulse-light {
          animation: pulse-light 4s infinite ease-in-out;
        }
        .animate-float-glow {
          animation: float-glow 15s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
