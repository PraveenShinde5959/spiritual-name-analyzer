
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 p-4 bg-gradient-to-t from-purple-800/80 to-pink-600/80 backdrop-blur-sm text-center text-sm text-white mt-8">
      <div className="container mx-auto">
        &copy; {new Date().getFullYear()} Name & Brand Analyzer. All rights reserved.
      </div>
    </footer>
  );
};
