export const TAX_RATES = {
  NATIONAL_PENSION: 0.0475, // 4.75% (2026년 인상: 9% → 9.5%, 근로자 부담 4.75%)
  HEALTH_INSURANCE: 0.03595, // 3.595% (2026년 인상: 7.09% → 7.19%, 근로자 부담 3.595%)
  LONG_TERM_CARE: 0.1314, // 13.14% of health insurance (2026년 인상)
  EMPLOYMENT_INSURANCE: 0.009, // 0.9% (동결)
  LOCAL_INCOME_TAX: 0.1, // 10% of income tax
};

export const CAPS = {
  MAX_NATIONAL_PENSION_BASE: 6370000, // 2025.7~2026.6 기준
  MIN_NATIONAL_PENSION_BASE: 400000, // 2025.7~2026.6 기준
  MAX_HEALTH_INSURANCE_BASE: 110332300,
};
