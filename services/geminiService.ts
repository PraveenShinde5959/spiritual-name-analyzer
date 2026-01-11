
import { GoogleGenAI } from '@google/genai';
import { AnalysisInput } from '../types';

interface GeminiPredictionParams extends AnalysisInput {
  numerologyScore: number;
  luckyLetters: string[];
  luckyNumbers: number[];
}

export async function getGeminiPredictions(
  params: GeminiPredictionParams
): Promise<{ energyPrediction: string; successPrediction: string; suggestedCorrections: string[] }> {
  if (!process.env.API_KEY) {
    console.error('API_KEY is not set. Gemini API calls will fail.');
    // Return mock data if API_KEY is not available
    return {
      energyPrediction: "Due to missing API_KEY, this is mock data. Your energy flows with a harmonious balance, attracting opportunities for growth and inner peace.",
      successPrediction: "Due to missing API_KEY, this is mock data. Success is within reach through mindful actions and embracing your unique spiritual path. Focus on collaborations.",
      suggestedCorrections: ["Due to missing API_KEY, this is mock data. Meditate daily for clarity.", "Due to missing API_KEY, this is mock data. Incorporate the color violet into your wardrobe.", "Due to missing API_KEY, this is mock data. Spend time in nature to ground your energy."],
    };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview"; // Basic text tasks

  const prompt = `Analyze the spiritual energy and success potential for the following details, and suggest corrections if needed.
  Name: ${params.name}
  ${params.brandName ? `Brand Name: ${params.brandName}` : ''}
  ${params.dob ? `Date of Birth: ${params.dob}` : ''}
  Numerology Score: ${params.numerologyScore}
  Lucky Letters: ${params.luckyLetters.join(', ')}
  Lucky Numbers: ${params.luckyNumbers.join(', ')}

  Provide:
  1. A concise "Energy Prediction" (1-2 sentences).
  2. A concise "Success Prediction" (1-2 sentences).
  3. A list of "Suggested Corrections" (3-5 bullet points) for enhanced spiritual alignment and success, based on numerology and general spiritual principles.
  Format the output as a JSON object with keys: energyPrediction, successPrediction, and suggestedCorrections (an array of strings).`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            energyPrediction: {
              type: Type.STRING,
              description: 'Concise prediction about the individual\'s energy.',
            },
            successPrediction: {
              type: Type.STRING,
              description: 'Concise prediction about the individual\'s success potential.',
            },
            suggestedCorrections: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: 'List of suggested corrections.',
            },
          },
          propertyOrdering: ["energyPrediction", "successPrediction", "suggestedCorrections"],
        },
      },
    });

    const jsonStr = response.text.trim();
    const parsedResult = JSON.parse(jsonStr);

    if (
      typeof parsedResult.energyPrediction === 'string' &&
      typeof parsedResult.successPrediction === 'string' &&
      Array.isArray(parsedResult.suggestedCorrections) &&
      parsedResult.suggestedCorrections.every((item: unknown) => typeof item === 'string')
    ) {
      return parsedResult as { energyPrediction: string; successPrediction: string; suggestedCorrections: string[] };
    } else {
      throw new Error('Gemini API response did not match expected schema.');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Fallback or more detailed error handling
    return {
      energyPrediction: "Could not get energy prediction due to an API error. Please try again.",
      successPrediction: "Could not get success prediction due to an API error. Please try again.",
      suggestedCorrections: ["Could not get suggestions due to an API error."],
    };
  }
}

// Helper to prevent `Type` from being imported with `import type`
// which causes runtime issues when accessing enum values.
enum Type {
  TYPE_UNSPECIFIED = 'TYPE_UNSPECIFIED',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  INTEGER = 'INTEGER',
  BOOLEAN = 'BOOLEAN',
  ARRAY = 'ARRAY',
  OBJECT = 'OBJECT',
  NULL = 'NULL',
}
