import { SalaryInput, TaxBreakdown } from '@/types';
import { TAX_RATES, CAPS } from '@/constants';

export const calculateSalary = (input: SalaryInput): TaxBreakdown => {
  const { amount, isMonthly, nonTaxable, dependents, childrenUnder20 } = input;

  const monthlyGross = isMonthly ? amount : amount / 12;
  const taxableIncome = Math.max(0, monthlyGross - nonTaxable);

  // 1. National Pension
  const pensionBase = Math.min(Math.max(taxableIncome, CAPS.MIN_NATIONAL_PENSION_BASE), CAPS.MAX_NATIONAL_PENSION_BASE);
  const nationalPension = Math.floor(pensionBase * TAX_RATES.NATIONAL_PENSION / 10) * 10;

  // 2. Health Insurance
  const healthInsurance = Math.floor(taxableIncome * TAX_RATES.HEALTH_INSURANCE / 10) * 10;

  // 3. Long Term Care (based on Health Insurance)
  const longTermCare = Math.floor(healthInsurance * TAX_RATES.LONG_TERM_CARE / 10) * 10;

  // 4. Employment Insurance
  const employmentInsurance = Math.floor(taxableIncome * TAX_RATES.EMPLOYMENT_INSURANCE / 10) * 10;

  // 5. Income Tax (Simplified Bracket Logic for demo purposes)
  // Real calculation uses a complex "Simplified Tax Table" (간이세액표)
  // This is a simplified estimation model
  let estimatedIncomeTax = 0;
  const annualTaxable = taxableIncome * 12;

  if (annualTaxable <= 14000000) estimatedIncomeTax = annualTaxable * 0.06;
  else if (annualTaxable <= 50000000) estimatedIncomeTax = 840000 + (annualTaxable - 14000000) * 0.15;
  else if (annualTaxable <= 88000000) estimatedIncomeTax = 6240000 + (annualTaxable - 50000000) * 0.24;
  else estimatedIncomeTax = 15360000 + (annualTaxable - 88000000) * 0.35;

  // Adjust for dependents (rough deduction)
  const deductionAdjust = (dependents + childrenUnder20) * 150000;
  estimatedIncomeTax = Math.max(0, (estimatedIncomeTax - deductionAdjust) / 12);

  const incomeTax = Math.floor(estimatedIncomeTax / 10) * 10;

  // 6. Local Income Tax (10% of Income Tax)
  const localIncomeTax = Math.floor(incomeTax * TAX_RATES.LOCAL_INCOME_TAX / 10) * 10;

  const totalDeductions = nationalPension + healthInsurance + longTermCare + employmentInsurance + incomeTax + localIncomeTax;
  const netPay = monthlyGross - totalDeductions;

  return {
    grossPay: monthlyGross,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    incomeTax,
    localIncomeTax,
    totalDeductions,
    netPay
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
};
