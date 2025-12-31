export interface SalaryInput {
  amount: number;
  isMonthly: boolean;
  nonTaxable: number;
  dependents: number;
  childrenUnder20: number;
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
