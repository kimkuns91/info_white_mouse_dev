// 취업자 유형
export type WorkerType = "youth" | "senior" | "disabled" | "careerWoman";

// 계산기 입력값
export interface SmeTaxCalculatorInput {
  birthDate: Date;
  employmentDate: Date;
  workerType: WorkerType;
  hasMilitaryService: boolean;
  militaryStartDate?: Date;
  militaryEndDate?: Date;
}

// 기간 (년, 월, 일)
export interface Period {
  years: number;
  months: number;
  days: number;
}

// 계산 결과
export interface SmeTaxCalculationResult {
  // 자격 여부
  isEligible: boolean;
  ineligibleReason?: string;

  // (5) 중소기업에 취업한 날 연령
  ageAtEmployment: Period;

  // (6) 병역근무기간 (청년만, 6년 한도)
  militaryPeriod?: Period;

  // (7) 병역근무기간 차감 후 연령 (청년만)
  adjustedAge?: Period;

  // (8) 감면 시작일
  startDate: Date;

  // (9) 감면 종료일
  endDate: Date;

  // 혜택 정보
  reductionRate: number; // 감면율 (90 or 70)
  reductionPeriodYears: number; // 감면기간 (5 or 3)
  annualLimit: number; // 연간 한도 (200만원)

  // 취업자 유형 라벨
  workerTypeLabel: string;
}

// 취업자 유형별 정보
export const WORKER_TYPE_INFO: Record<
  WorkerType,
  {
    label: string;
    ageCondition: string;
    reductionRate: number;
    reductionPeriodYears: number;
  }
> = {
  youth: {
    label: "청년",
    ageCondition: "15세 ~ 34세",
    reductionRate: 90,
    reductionPeriodYears: 5,
  },
  senior: {
    label: "60세 이상",
    ageCondition: "60세 이상",
    reductionRate: 70,
    reductionPeriodYears: 3,
  },
  disabled: {
    label: "장애인",
    ageCondition: "연령 무관",
    reductionRate: 70,
    reductionPeriodYears: 3,
  },
  careerWoman: {
    label: "경력단절여성",
    ageCondition: "연령 무관",
    reductionRate: 70,
    reductionPeriodYears: 3,
  },
};
