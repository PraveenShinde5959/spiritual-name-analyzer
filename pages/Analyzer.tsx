
import React, { useState, FormEvent, useCallback } from 'react';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { calculateNumerologyScore, getLuckyLetters, getLuckyNumbers } from '../utils/numerology';
import { getGeminiPredictions } from '../services/geminiService';
import { AnalysisResult } from '../types';

interface AnalyzerProps {
  setAnalysisResult: (result: AnalysisResult | null) => void;
  isRazorpayReady: boolean;
}

const RAZORPAY_KEY_ID = 'rzp_test_S2dEyKO37CBPOO'; // Your Razorpay Test API Key
const REPORT_PRICE_PAISE = 9900; // ₹99 in paise

export const Analyzer: React.FC<AnalyzerProps> = ({ setAnalysisResult, isRazorpayReady }) => {
  const [name, setName] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatusMessage, setPaymentStatusMessage] = useState<string | null>(null);
  const [tempAnalysisResult, setTempAnalysisResult] = useState<AnalysisResult | null>(null);

  const displayRazorpay = useCallback((analysisData: AnalysisResult) => {
    if (!window.Razorpay) {
      setError('Razorpay SDK not loaded. Please try again or refresh.');
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: REPORT_PRICE_PAISE,
      currency: 'INR',
      name: 'Name & Brand Analyzer',
      description: 'Unlock your spiritual analysis report',
      image: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/razorpay_logo_icon_169018.png', // Placeholder logo
      handler: function (response: any) {
        console.log('Payment success:', response);
        setResult(analysisData);
        setAnalysisResult(analysisData);
        setPaymentStatusMessage('Payment successful! Your analysis is now displayed.');
        setTempAnalysisResult(null); // Clear temporary result
        setError(null);
        setIsLoading(false); // End loading on success
      },
      prefill: {
        name: analysisData.name,
        email: 'customer@example.com', // Replace with dynamic user email if available
        contact: '9999999999', // Replace with dynamic user contact if available
      },
      notes: {
        analysis_for: analysisData.name,
        brand_name: analysisData.brandName || 'N/A',
      },
      theme: {
        color: '#8B5CF6', // Purple theme to match app
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response: any) {
      console.error('Payment failed:', response);
      // More specific error message for testing QR/UPI issues
      setError('Payment failed. Please try again. For testing, consider using card/net banking options as QR/UPI may be unstable in a client-side only setup without a backend order ID.');
      setPaymentStatusMessage(null);
      setIsLoading(false);
    });
    paymentObject.on('modal.close', () => {
      console.log('Payment modal closed');
      setError('Payment cancelled. Please complete the payment to view your analysis.');
      setPaymentStatusMessage(null);
      setIsLoading(false);
    });
    paymentObject.open();
  }, [setAnalysisResult]);

  const handleAnalyze = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name to analyze.');
      return;
    }
    if (!isRazorpayReady) {
      setError('Payment gateway is loading. Please wait a moment.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null); // Clear previous results
    setPaymentStatusMessage(null);

    try {
      // 1. Client-side numerology calculations
      const numerologyScore = calculateNumerologyScore(name);
      const luckyLetters = getLuckyLetters(name);
      const luckyNumbers = getLuckyNumbers(name, dob);

      // 2. Call Gemini API for predictions and corrections
      const geminiResult = await getGeminiPredictions({
        name,
        brandName: brandName.trim() === '' ? undefined : brandName,
        dob: dob.trim() === '' ? undefined : dob,
        numerologyScore,
        luckyLetters,
        luckyNumbers,
      });

      const fullResult: AnalysisResult = {
        name,
        brandName: brandName.trim() === '' ? undefined : brandName,
        dob: dob.trim() === '' ? undefined : dob,
        numerologyScore,
        luckyLetters,
        luckyNumbers,
        energyPrediction: geminiResult.energyPrediction,
        successPrediction: geminiResult.successPrediction,
        suggestedCorrections: geminiResult.suggestedCorrections,
        shareText: `My numerology score is ${numerologyScore} with lucky letters ${luckyLetters.join(', ')}! Check yours on Name & Brand Analyzer!`,
      };
      
      setTempAnalysisResult(fullResult); // Store result temporarily
      displayRazorpay(fullResult); // Initiate payment
      // setIsLoading(false) is now handled by payment success/failure callbacks

    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Failed to perform analysis. Please try again.');
      setIsLoading(false);
    }
  }, [name, brandName, dob, isRazorpayReady, displayRazorpay]);

  return (
    <div className="flex flex-col items-center w-full max-w-3xl bg-purple-900/60 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-xl border border-purple-700 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold-100 mb-8 text-center">
        Analyze Your Name & Brand
      </h2>

      <form onSubmit={handleAnalyze} className="w-full space-y-6">
        <InputField
          label="Your Full Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Jane Doe"
          required
        />
        <InputField
          label="Business/Brand Name (Optional)"
          id="brandName"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="e.g., Zenith Innovations"
        />
        <InputField
          label="Date of Birth (Optional)"
          id="dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        {error && <p className="text-red-400 text-center">{error}</p>}
        {paymentStatusMessage && <p className="text-green-400 text-center">{paymentStatusMessage}</p>}
        {isRazorpayReady && !isLoading && !error && ( // Show testing guidance if gateway is ready and no other errors
          <p className="text-yellow-300 text-sm text-center mt-4">
            <span className="font-bold">Heads up:</span> For testing payments, please use test card/net banking details.
            QR/UPI payments may not work reliably in this client-side demo without a backend server to create an `order_id`.
          </p>
        )}
        <div className="flex justify-center">
          <Button type="submit" isLoading={isLoading || !isRazorpayReady} className="mt-6 text-lg">
            {!isRazorpayReady ? 'Loading Payment Gateway...' : (isLoading ? 'Analyzing...' : 'Analyze & Pay ₹99')}
          </Button>
        </div>
      </form>

      {result && (
        <div className="mt-10 w-full animate-slide-in-up">
          <div className="bg-gradient-to-br from-purple-800 to-pink-700 rounded-xl p-6 md:p-8 shadow-2xl border border-gold-400">
            <h3 className="text-3xl font-serif font-bold text-gold-100 mb-6 text-center">
              Your Spiritual Analysis Report
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ResultCard title="Numerology Score" value={result.numerologyScore} />
              <ResultCard title="Lucky Letters" value={result.luckyLetters.join(', ')} />
              <ResultCard title="Lucky Numbers" value={result.luckyNumbers.join(', ')} />
              <ResultCard
                title="Energy Prediction"
                value={result.energyPrediction}
                isFullWidth
              />
              <ResultCard
                title="Success Prediction"
                value={result.successPrediction}
                isFullWidth
              />
              <ResultCard
                title="Suggested Corrections"
                value={
                  <ul className="list-disc pl-5 space-y-1">
                    {result.suggestedCorrections.map((correction, index) => (
                      <li key={index}>{correction}</li>
                    ))}
                  </ul>
                }
                isFullWidth
              />
            </div>
            <SocialShareButtons shareText={result.shareText} />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        @keyframes slide-in-up {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up { animation: slide-in-up 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

interface ResultCardProps {
  title: string;
  value: React.ReactNode;
  isFullWidth?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, value, isFullWidth = false }) => {
  return (
    <div
      className={`bg-purple-900/50 p-4 rounded-lg shadow-inner border border-purple-600 ${
        isFullWidth ? 'md:col-span-2' : ''
      }`}
    >
      <h4 className="text-lg font-semibold text-gold-200 mb-2">{title}:</h4>
      <p className="text-white text-base leading-relaxed">{value}</p>
    </div>
  );
};
