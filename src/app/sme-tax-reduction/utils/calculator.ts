import {
  SmeTaxCalculatorInput,
  SmeTaxCalculationResult,
  Period,
  WORKER_TYPE_INFO,
} from "../types";

/**
 * 두 날짜 사이의 기간을 년, 월, 일로 계산
 */
export function calculatePeriod(startDate: Date, endDate: Date): Period {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  // 일이 음수면 전월에서 빌려옴
  if (days < 0) {
    months--;
    // 전월의 마지막 날짜 계산
    const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // 월이 음수면 년에서 빌려옴
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

/**
 * Period를 총 일수로 변환 (대략적 계산)
 */
export function periodToTotalDays(period: Period): number {
  return period.years * 365 + period.months * 30 + period.days;
}

/**
 * Period를 빼기 연산
 */
export function subtractPeriod(a: Period, b: Period): Period {
  let totalDaysA = periodToTotalDays(a);
  let totalDaysB = periodToTotalDays(b);
  let resultDays = totalDaysA - totalDaysB;

  if (resultDays < 0) resultDays = 0;

  const years = Math.floor(resultDays / 365);
  resultDays %= 365;
  const months = Math.floor(resultDays / 30);
  const days = resultDays % 30;

  return { years, months, days };
}

/**
 * Period가 특정 년수 이하인지 확인 (34세 이하 판단용)
 */
export function isPeriodLessOrEqual(period: Period, maxYears: number): boolean {
  if (period.years < maxYears) return true;
  if (period.years === maxYears && period.months === 0 && period.days === 0)
    return true;
  return period.years <= maxYears;
}

/**
 * Period 문자열 포맷
 */
export function formatPeriod(period: Period): string {
  const parts: string[] = [];
  if (period.years > 0) parts.push(`${period.years}년`);
  if (period.months > 0) parts.push(`${period.months.toString().padStart(2, "0")}월`);
  parts.push(`${period.days.toString().padStart(2, "0")}일`);
  return parts.join(" ");
}

/**
 * 날짜 포맷 (YYYY년 MM월 DD일)
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
}

/**
 * 날짜 포맷 (YYYY.MM.DD)
 */
export function formatDateShort(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
}

/**
 * 감면 종료일 계산 (시작일로부터 N년이 되는 날이 속하는 달의 말일)
 */
export function calculateEndDate(startDate: Date, years: number): Date {
  // 시작일로부터 N년 후
  const endYear = startDate.getFullYear() + years;
  const endMonth = startDate.getMonth();

  // 해당 월의 말일
  const lastDayOfMonth = new Date(endYear, endMonth + 1, 0);

  return lastDayOfMonth;
}

/**
 * 병역기간을 6년 한도로 제한
 */
function limitMilitaryPeriod(period: Period): Period {
  const MAX_YEARS = 6;
  const totalDays = periodToTotalDays(period);
  const maxDays = MAX_YEARS * 365;

  if (totalDays <= maxDays) {
    return period;
  }

  return { years: MAX_YEARS, months: 0, days: 0 };
}

/**
 * 중소기업 소득세 감면 계산
 */
export function calculateSmeTaxReduction(
  input: SmeTaxCalculatorInput
): SmeTaxCalculationResult {
  const workerInfo = WORKER_TYPE_INFO[input.workerType];

  // (5) 중소기업에 취업한 날 연령 계산
  const ageAtEmployment = calculatePeriod(input.birthDate, input.employmentDate);

  // 변수 초기화
  let militaryPeriod: Period | undefined;
  let adjustedAge: Period | undefined;
  let isEligible = true;
  let ineligibleReason: string | undefined;

  // 청년인 경우 병역기간 처리
  if (input.workerType === "youth") {
    if (
      input.hasMilitaryService &&
      input.militaryStartDate &&
      input.militaryEndDate
    ) {
      // 병역기간 계산 (6년 한도)
      const rawMilitaryPeriod = calculatePeriod(
        input.militaryStartDate,
        input.militaryEndDate
      );
      militaryPeriod = limitMilitaryPeriod(rawMilitaryPeriod);

      // 병역기간 차감 후 연령
      adjustedAge = subtractPeriod(ageAtEmployment, militaryPeriod);
    } else {
      adjustedAge = ageAtEmployment;
    }

    // 청년 자격 확인 (15세 이상 34세 이하)
    const ageToCheck = adjustedAge || ageAtEmployment;
    if (ageToCheck.years < 15) {
      isEligible = false;
      ineligibleReason = "취업 시 연령이 15세 미만입니다.";
    } else if (!isPeriodLessOrEqual(ageToCheck, 34)) {
      isEligible = false;
      ineligibleReason =
        "병역기간 차감 후 연령이 34세를 초과합니다. 고령자, 장애인, 경력단절여성 요건을 확인해보세요.";
    }
  }

  // 고령자 자격 확인 (60세 이상)
  if (input.workerType === "senior") {
    if (ageAtEmployment.years < 60) {
      isEligible = false;
      ineligibleReason = "취업 시 연령이 60세 미만입니다.";
    }
  }

  // 감면 기간 계산
  const startDate = input.employmentDate;
  const endDate = calculateEndDate(startDate, workerInfo.reductionPeriodYears);

  return {
    isEligible,
    ineligibleReason,
    ageAtEmployment,
    militaryPeriod,
    adjustedAge,
    startDate,
    endDate,
    reductionRate: workerInfo.reductionRate,
    reductionPeriodYears: workerInfo.reductionPeriodYears,
    annualLimit: 2000000,
    workerTypeLabel: workerInfo.label,
  };
}
