import { GoogleGenAI } from "@google/genai";
import { TaxBreakdown, CarRecommendation } from "@/types";

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

export const getCarRecommendation = async (annualSalary: number): Promise<CarRecommendation[] | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

  const appropriateCarPrice = Math.round(annualSalary * 0.4); // 연봉의 40% 정도
  const minCarPrice = Math.round(annualSalary * 0.25);
  const maxCarPrice = Math.round(annualSalary * 0.6);

  const prompt = `
    한국에서 연봉 ${(annualSalary / 10000).toLocaleString()}만원인 직장인에게 적합한 자동차를 추천해주세요.

    적정 차량 가격대: ${(minCarPrice / 10000).toLocaleString()}만원 ~ ${(maxCarPrice / 10000).toLocaleString()}만원
    권장 차량 가격: ${(appropriateCarPrice / 10000).toLocaleString()}만원 이하

    다음 JSON 형식으로 정확히 응답해주세요. 다른 텍스트 없이 JSON만 반환하세요:
    [
      {
        "category": "경제적 선택",
        "cars": [
          {
            "name": "차량명 (브랜드 포함)",
            "priceRange": "가격대 (예: 1,500~2,000만원)",
            "monthlyPayment": "월 할부금 예상 (60개월 기준)",
            "reason": "추천 이유 (30자 이내)"
          }
        ],
        "tip": "이 카테고리 차량 구매 팁"
      },
      {
        "category": "균형 잡힌 선택",
        "cars": [...],
        "tip": "..."
      },
      {
        "category": "여유 있는 선택",
        "cars": [...],
        "tip": "..."
      }
    ]

    각 카테고리별로 2-3대의 차량을 추천해주세요.
    2025년 현재 한국에서 구매 가능한 실제 차량만 추천해주세요.
    국산차와 수입차를 적절히 섞어주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "당신은 한국 자동차 시장 전문가입니다. 연봉에 맞는 합리적인 차량을 추천합니다. 반드시 요청된 JSON 형식으로만 응답하세요."
      }
    });

    const text = response.text || '';

    // JSON 파싱 시도
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as CarRecommendation[];
      return parsed;
    }

    return null;
  } catch (error) {
    console.error("Gemini API Error (Car Recommendation):", error);
    return null;
  }
};
