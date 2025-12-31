export interface SalaryInput {
  amount: number;
  isMonthly: boolean;
  nonTaxable: number;
  dependents: number;
  childrenUnder20: number;
  children8to20?: number; // 8세~20세 자녀 수 (자녀세액공제용), 선택적
}

export interface TaxBracket {
  min: number;  // 월급여 하한 (천원)
  max: number;  // 월급여 상한 (천원)
  taxes: number[];  // 부양가족 1~11명별 세액 (원)
}

export interface TaxBreakdown {
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalDeductions: number;
  netPay: number;
  grossPay: number;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}
