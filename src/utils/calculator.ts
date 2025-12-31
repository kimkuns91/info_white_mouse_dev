import { SalaryInput, TaxBreakdown, TaxBracket } from '@/types';
import { getTaxRates, getCaps, TaxYear, DEFAULT_YEAR } from '@/constants';
import taxTableData from '@/data/tax-table-2024.json';

// 간이세액표 데이터 로드
const TAX_TABLE: TaxBracket[] = taxTableData as TaxBracket[];

/**
 * 간이세액표에서 소득세를 조회합니다.
 * @param monthlySalary 비과세 제외한 월급여 (원)
 * @param dependents 공제대상가족 수 (본인 포함, 최소 1)
 * @returns 소득세액 (원)
 */
const getIncomeTaxFromTable = (monthlySalary: number, dependents: number): number => {
  const salaryInThousand = Math.floor(monthlySalary / 1000);

  // 월급여 1천만원 초과 시 공식으로 계산
  if (salaryInThousand > 10000) {
    return calculateHighIncomeTax(monthlySalary, dependents);
  }

  // 간이세액표에서 구간 찾기
  const bracket = TAX_TABLE.find(row =>
    salaryInThousand >= row.min && salaryInThousand < row.max
  );

  if (!bracket) return 0;

  // 부양가족 수에 해당하는 세액 반환 (최대 11명)
  const familyIndex = Math.min(Math.max(dependents, 1), 11) - 1;
  return bracket.taxes[familyIndex];
};

/**
 * 월급여 1천만원 초과 시 소득세 계산 공식
 * 간이세액표는 월 1천만원까지만 있고, 그 이상은 공식으로 계산
 */
const calculateHighIncomeTax = (monthlySalary: number, dependents: number): number => {
  const salaryInThousand = Math.floor(monthlySalary / 1000);

  // 1천만원 구간의 세액 조회 (기준 세액)
  const baseBracket = TAX_TABLE.find(row => row.min === 9996 || row.min === 10000 ||
    (row.min <= 10000 && row.max > 10000));

  // 테이블 마지막 구간 찾기 (1천만원 세액)
  const lastBracket = TAX_TABLE[TAX_TABLE.length - 1];
  const familyIndex = Math.min(Math.max(dependents, 1), 11) - 1;
  const baseTax = (baseBracket || lastBracket).taxes[familyIndex];

  const excessAmount = monthlySalary - 10000000; // 1천만원 초과 금액

  let additionalTax = 0;

  if (salaryInThousand <= 14000) {
    // 10,000천원 초과 ~ 14,000천원 이하
    additionalTax = (excessAmount * 0.98 * 0.35) + 25000;
  } else if (salaryInThousand <= 28000) {
    // 14,000천원 초과 ~ 28,000천원 이하
    const excess14M = monthlySalary - 14000000;
    additionalTax = 1397000 + (excess14M * 0.98 * 0.38);
  } else if (salaryInThousand <= 30000) {
    // 28,000천원 초과 ~ 30,000천원 이하
    const excess28M = monthlySalary - 28000000;
    additionalTax = 6610600 + (excess28M * 0.98 * 0.40);
  } else if (salaryInThousand <= 45000) {
    // 30,000천원 초과 ~ 45,000천원 이하
    const excess30M = monthlySalary - 30000000;
    additionalTax = 7394600 + (excess30M * 0.40);
  } else if (salaryInThousand <= 87000) {
    // 45,000천원 초과 ~ 87,000천원 이하
    const excess45M = monthlySalary - 45000000;
    additionalTax = 13394600 + (excess45M * 0.42);
  } else {
    // 87,000천원 초과
    const excess87M = monthlySalary - 87000000;
    additionalTax = 31034600 + (excess87M * 0.45);
  }

  return Math.floor((baseTax + additionalTax) / 10) * 10;
};

/**
 * 자녀세액공제 계산 (8세~20세 자녀)
 * @param children8to20 8세~20세 자녀 수
 * @returns 월간 자녀세액공제액 (원)
 */
const calculateChildTaxCredit = (children8to20: number): number => {
  if (children8to20 <= 0) return 0;

  if (children8to20 === 1) {
    return 12500;
  } else if (children8to20 === 2) {
    return 29160;
  } else {
    // 3명 이상: 29,160 + (자녀수 - 2) × 25,000
    return 29160 + (children8to20 - 2) * 25000;
  }
};

export const calculateSalary = (input: SalaryInput, year: TaxYear = DEFAULT_YEAR): TaxBreakdown => {
  const { amount, isMonthly, nonTaxable, dependents, children8to20 = 0 } = input;

  const TAX_RATES = getTaxRates(year);
  const CAPS = getCaps(year);

  const monthlyGross = isMonthly ? amount : amount / 12;
  const taxableIncome = Math.max(0, monthlyGross - nonTaxable);

  // 1. 국민연금 (기준소득월액 상/하한 적용)
  const pensionBase = Math.min(Math.max(taxableIncome, CAPS.MIN_NATIONAL_PENSION_BASE), CAPS.MAX_NATIONAL_PENSION_BASE);
  const nationalPension = Math.floor(pensionBase * TAX_RATES.NATIONAL_PENSION / 10) * 10;

  // 2. 건강보험
  const healthInsurance = Math.floor(taxableIncome * TAX_RATES.HEALTH_INSURANCE / 10) * 10;

  // 3. 장기요양보험 (건강보험료 기준)
  const longTermCare = Math.floor(healthInsurance * TAX_RATES.LONG_TERM_CARE / 10) * 10;

  // 4. 고용보험
  const employmentInsurance = Math.floor(taxableIncome * TAX_RATES.EMPLOYMENT_INSURANCE / 10) * 10;

  // 5. 소득세 (간이세액표 조회)
  let incomeTax = getIncomeTaxFromTable(taxableIncome, dependents);

  // 6. 자녀세액공제 적용 (8세~20세 자녀)
  if (children8to20 > 0) {
    const childTaxCredit = calculateChildTaxCredit(children8to20);
    incomeTax = Math.max(0, incomeTax - childTaxCredit);
  }

  // 10원 단위 절사
  incomeTax = Math.floor(incomeTax / 10) * 10;

  // 7. 지방소득세 (소득세의 10%)
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
