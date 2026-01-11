
export interface AnalysisInput {
  name: string;
  brandName?: string;
  dob?: string;
}

export interface AnalysisResult {
  name: string;
  brandName?: string;
  dob?: string;
  numerologyScore: number;
  luckyLetters: string[];
  luckyNumbers: number[];
  energyPrediction: string;
  successPrediction: string;
  suggestedCorrections: string[];
  shareText: string;
}
