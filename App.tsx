
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Analyzer } from './pages/Analyzer';
import { Reports } from './pages/Reports';
import { Pricing } from './pages/Pricing';
import { About } from './pages/About';
import { NavigationRoute } from './constants';
import { SpiritualBackground } from './components/SpiritualBackground';
import { AnalysisResult } from './types';

// Declare Razorpay globally to avoid TypeScript errors
declare global {
  interface Window {
    Razorpay: new (options: any) => any;
  }
}

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay SDK loaded successfully.');
      setIsRazorpayReady(true);
    };
    script.onerror = (error) => {
      console.error('Failed to load Razorpay SDK:', error);
      setIsRazorpayReady(false); // Ensure this is false on error
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <SpiritualBackground />
      <Header />
      <main className="flex-grow z-10 p-4 md:p-8 flex flex-col items-center justify-center">
        <Routes>
          <Route path={NavigationRoute.Home} element={<Home />} />
          <Route path={NavigationRoute.Analyzer} element={<Analyzer setAnalysisResult={setAnalysisResult} isRazorpayReady={isRazorpayReady} />} />
          <Route path={NavigationRoute.Reports} element={<Reports sampleReport={analysisResult} />} />
          <Route path={NavigationRoute.Pricing} element={<Pricing isRazorpayReady={isRazorpayReady} />} />
          <Route path={NavigationRoute.About} element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
