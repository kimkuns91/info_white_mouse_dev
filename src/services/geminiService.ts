import { GoogleGenAI } from "@google/genai";
import { TaxBreakdown } from "@/types";

export const getFinancialAdvice = async (breakdown: TaxBreakdown) => {
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

  const prompt = `
    Based on the following monthly salary breakdown in South Korea, provide 3 brief, high-impact financial tips.
    Format your response in simple Korean.

    Gross Salary: ${breakdown.grossPay} KRW
    Net Salary: ${breakdown.netPay} KRW
    Total Tax/Insurance: ${breakdown.totalDeductions} KRW

    Focus on:
    1. Tax saving strategies (e.g., IRP, ISA).
    2. Budgeting for someone with this income.
    3. Long-term wealth building.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional Korean financial advisor specializing in tax optimization and wealth management."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 조언을 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};
