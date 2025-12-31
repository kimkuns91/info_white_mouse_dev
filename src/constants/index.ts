export type TaxYear = 2025 | 2026;

export const TAX_RATES_BY_YEAR = {
  2025: {
    NATIONAL_PENSION: 0.045, // 4.5%
    HEALTH_INSURANCE: 0.03545, // 3.545%
    LONG_TERM_CARE: 0.1295, // 12.95% of health insurance
    EMPLOYMENT_INSURANCE: 0.009, // 0.9%
    LOCAL_INCOME_TAX: 0.1, // 10% of income tax
  },
  2026: {
    NATIONAL_PENSION: 0.0475, // 4.75% (인상)
    HEALTH_INSURANCE: 0.03595, // 3.595% (인상)
    LONG_TERM_CARE: 0.1314, // 13.14% of health insurance (인상)
    EMPLOYMENT_INSURANCE: 0.009, // 0.9% (동결)
    LOCAL_INCOME_TAX: 0.1, // 10% of income tax
  },
} as const;

export const CAPS_BY_YEAR = {
  2025: {
    MAX_NATIONAL_PENSION_BASE: 6170000, // 617만원
    MIN_NATIONAL_PENSION_BASE: 390000, // 39만원
    MAX_HEALTH_INSURANCE_BASE: 110332300,
  },
  2026: {
    MAX_NATIONAL_PENSION_BASE: 6370000, // 637만원 (인상)
    MIN_NATIONAL_PENSION_BASE: 400000, // 40만원 (인상)
    MAX_HEALTH_INSURANCE_BASE: 110332300,
  },
} as const;

// 기본 연도 (최신)
export const DEFAULT_YEAR: TaxYear = 2026;

// 하위 호환성을 위한 기존 export (2026년 기준)
export const TAX_RATES = TAX_RATES_BY_YEAR[2026];
export const CAPS = CAPS_BY_YEAR[2026];

// 연도별 요율 가져오기 헬퍼 함수
export const getTaxRates = (year: TaxYear) => TAX_RATES_BY_YEAR[year];
export const getCaps = (year: TaxYear) => CAPS_BY_YEAR[year];
