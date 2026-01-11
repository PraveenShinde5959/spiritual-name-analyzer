
import React from 'react';
import { Button } from '../components/Button';
import { AnalysisResult } from '../types';
import { SAMPLE_REPORT_PDF_URL } from '../constants';

interface ReportsProps {
  sampleReport: AnalysisResult | null;
}

export const Reports: React.FC<ReportsProps> = ({ sampleReport }) => {
  const handleDownload = () => {
    window.open(SAMPLE_REPORT_PDF_URL, '_blank');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl bg-purple-900/60 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-xl border border-purple-700 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold-100 mb-8 text-center">
        Your Detailed Spiritual Report
      </h2>

      <p className="text-lg text-gold-200 mb-6 text-center">
        Explore a comprehensive analysis of your name's spiritual energy, numerology, and cosmic alignment.
      </p>

      {sampleReport ? (
        <div className="w-full bg-gradient-to-br from-purple-800 to-pink-700 rounded-xl p-6 md:p-8 shadow-2xl border border-gold-400 mb-8">
          <h3 className="text-2xl font-serif font-bold text-gold-100 mb-4 text-center">
            Sample Basic Report Preview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white text-sm">
            <div>
              <p className="font-semibold text-gold-200">Name:</p>
              <p>{sampleReport.name}</p>
              {sampleReport.brandName && (
                <>
                  <p className="font-semibold text-gold-200 mt-2">Brand Name:</p>
                  <p>{sampleReport.brandName}</p>
                </>
              )}
              {sampleReport.dob && (
                <>
                  <p className="font-semibold text-gold-200 mt-2">Date of Birth:</p>
                  <p>{sampleReport.dob}</p>
                </>
              )}
            </div>
            <div>
              <p className="font-semibold text-gold-200">Numerology Score:</p>
              <p>{sampleReport.numerologyScore}</p>
              <p className="font-semibold text-gold-200 mt-2">Lucky Letters:</p>
              <p>{sampleReport.luckyLetters.join(', ')}</p>
              <p className="font-semibold text-gold-200 mt-2">Lucky Numbers:</p>
              <p>{sampleReport.luckyNumbers.join(', ')}</p>
            </div>
          </div>
          <div className="mt-6 text-white text-sm">
            <p className="font-semibold text-gold-200">Energy Prediction:</p>
            <p>{sampleReport.energyPrediction}</p>
            <p className="font-semibold text-gold-200 mt-4">Success Prediction:</p>
            <p>{sampleReport.successPrediction}</p>
            <p className="font-semibold text-gold-200 mt-4">Suggested Corrections:</p>
            <ul className="list-disc pl-5 space-y-1">
              {sampleReport.suggestedCorrections.map((correction, index) => (
                <li key={index}>{correction}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="w-full bg-purple-800/50 rounded-xl p-6 md:p-8 shadow-inner border border-purple-600 mb-8 text-center text-gold-200">
          <p className="text-lg">No analysis results found yet.</p>
          <p className="text-md mt-2">Please go to the <a href="/#/analyzer" className="underline text-gold-300 hover:text-white">Analyzer page</a> to generate your report first.</p>
        </div>
      )}

      {/* Removed the paragraph about unlocking full potential */}
      {/* Removed the "Download Sample PDF Report" button */}

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
