
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl bg-purple-900/60 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-xl border border-purple-700 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold-100 mb-8 text-center">
        About Name & Brand Analyzer
      </h2>

      <div className="text-lg text-white space-y-6 max-w-2xl text-center">
        <p>
          At Name & Brand Analyzer, we believe that everything in the universe vibrates at a unique frequency,
          including your name and brand. Our platform taps into ancient spiritual wisdom,
          combining the mystical art of numerology with modern insights into energetic alignment.
        </p>
        <p>
          <span className="font-semibold text-gold-200">Numerology</span> is the study of the mystical relationship
          between numbers and events. Each letter in your name corresponds to a specific numerical vibration,
          which reveals deep insights into your personality, destiny, challenges, and opportunities.
          Understanding these numbers can empower you to make more aligned choices in life and business.
        </p>
        <p>
          Your <span className="font-semibold text-gold-200">Brand Energy</span> refers to the spiritual and energetic
          imprint your business or personal brand carries. A brand name, its associated numbers, and even the date
          of its inception can influence its success, resonance with customers, and overall karmic trajectory.
          We help you identify these energetic patterns to optimize for growth and harmonious impact.
        </p>
        <p>
          Our mission is to provide you with personalized spiritual insights, helping you
          uncover your lucky elements, predict potential energies, and suggest corrections for a more
          vibrant and successful path, both personally and professionally.
        </p>
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
