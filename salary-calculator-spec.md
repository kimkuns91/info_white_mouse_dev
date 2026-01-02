# 연봉 실수령액 계산기 명세서 (2025/2026)

## 개요

클로드 코드가 연봉 실수령액 계산기를 만들 때 참조할 명세서입니다.
**2025년 버전**과 **2026년 버전** 두 가지를 각각 구현해야 합니다.

---

## 1. 4대보험 요율 (연도별)

### 2025년 요율

| 항목 | 근로자 부담률 | 비고 |
|------|-------------|------|
| 국민연금 | 4.5% | 상한 617만원, 하한 39만원 |
| 건강보험 | 3.545% | |
| 장기요양보험 | 건강보험료 × 12.95% | |
| 고용보험 | 0.9% | |

### 2026년 요율 (변경됨)

| 항목 | 근로자 부담률 | 비고 |
|------|-------------|------|
| 국민연금 | **4.75%** | 상한 637만원, 하한 40만원 (인상) |
| 건강보험 | **3.595%** | (인상) |
| 장기요양보험 | 건강보험료 × **13.14%** | (인상) |
| 고용보험 | 0.9% | (동결) |

---

## 2. 소득세 계산: 간이세액표 사용 (중요!)

### ⚠️ 핵심 포인트
- **절대 누진세율로 직접 계산하지 마세요!**
- 실제 급여 시스템은 **국세청 간이세액표**를 룩업하여 사용합니다.
- 간이세액표에는 근로소득공제, 기본공제, 특별소득공제 등이 이미 반영되어 있습니다.

### 간이세액표 구조
- **월급여액 구간**: 천원 단위 (예: 4,100천원 ~ 4,120천원)
- **공제대상가족 수**: 1명 ~ 11명
- **세액**: 원 단위

### 간이세액표 사용 방법

```typescript
// 1. 월급여액(비과세 제외)으로 구간 찾기
// 2. 부양가족 수로 열 선택
// 3. 해당 세액 반환

function getIncomeTax(monthlySalary: number, dependents: number): number {
  // monthlySalary: 비과세 제외한 월급여 (원)
  // dependents: 공제대상가족 수 (본인 포함, 최소 1)
  
  const salaryInThousand = Math.floor(monthlySalary / 1000);
  
  // 간이세액표에서 구간 찾기
  const bracket = TAX_TABLE.find(row => 
    salaryInThousand >= row.min && salaryInThousand < row.max
  );
  
  if (!bracket) return 0;
  
  // 부양가족 수에 해당하는 세액 반환 (최대 11명)
  const familyIndex = Math.min(dependents, 11) - 1;
  return bracket.taxes[familyIndex];
}
```

### 월급여 1억원 초과 시 계산 공식

간이세액표는 월 1천만원까지만 있고, 그 이상은 공식으로 계산:

```
10,000천원 초과 ~ 14,000천원 이하:
  (1천만원 세액) + (1천만원 초과금액 × 98% × 35%) + 25,000원

14,000천원 초과 ~ 28,000천원 이하:
  (1천만원 세액) + 1,397,000원 + (1,400만원 초과금액 × 98% × 38%)

28,000천원 초과 ~ 30,000천원 이하:
  (1천만원 세액) + 6,610,600원 + (2,800만원 초과금액 × 98% × 40%)

30,000천원 초과 ~ 45,000천원 이하:
  (1천만원 세액) + 7,394,600원 + (3,000만원 초과금액 × 40%)

45,000천원 초과 ~ 87,000천원 이하:
  (1천만원 세액) + 13,394,600원 + (4,500만원 초과금액 × 42%)

87,000천원 초과:
  (1천만원 세액) + 31,034,600원 + (8,700만원 초과금액 × 45%)
```

### 지방소득세
- 소득세의 10%

---

## 3. 계산 로직 (TypeScript)

```typescript
interface SalaryInput {
  annualSalary: number;      // 연봉 (원)
  nonTaxableAmount: number;  // 비과세 월액 (원), 기본 200,000
  dependents: number;        // 부양가족 수 (본인 포함, 최소 1)
  children8to20: number;     // 8세~20세 자녀 수 (자녀세액공제용)
}

interface SalaryResult {
  monthlySalary: number;           // 월 급여
  taxableSalary: number;           // 과세 급여 (비과세 제외)
  nationalPension: number;         // 국민연금
  healthInsurance: number;         // 건강보험
  longTermCare: number;            // 장기요양보험
  employmentInsurance: number;     // 고용보험
  incomeTax: number;               // 소득세
  localIncomeTax: number;          // 지방소득세
  totalDeductions: number;         // 공제 합계
  netSalary: number;               // 실수령액
}

// 2025년 요율
const RATES_2025 = {
  nationalPension: 0.045,
  nationalPensionMax: 6170000,
  nationalPensionMin: 390000,
  healthInsurance: 0.03545,
  longTermCare: 0.1295,
  employmentInsurance: 0.009,
};

// 2026년 요율
const RATES_2026 = {
  nationalPension: 0.0475,
  nationalPensionMax: 6370000,
  nationalPensionMin: 400000,
  healthInsurance: 0.03595,
  longTermCare: 0.1314,
  employmentInsurance: 0.009,
};

function calculateSalary(input: SalaryInput, year: 2025 | 2026): SalaryResult {
  const rates = year === 2025 ? RATES_2025 : RATES_2026;
  
  // 1. 월 급여 계산
  const monthlySalary = Math.floor(input.annualSalary / 12);
  const taxableSalary = monthlySalary - input.nonTaxableAmount;
  
  // 2. 국민연금 (기준소득월액 상/하한 적용)
  const pensionBase = Math.min(
    Math.max(taxableSalary, rates.nationalPensionMin),
    rates.nationalPensionMax
  );
  const nationalPension = Math.floor(pensionBase * rates.nationalPension / 10) * 10;
  
  // 3. 건강보험
  const healthInsurance = Math.floor(taxableSalary * rates.healthInsurance / 10) * 10;
  
  // 4. 장기요양보험
  const longTermCare = Math.floor(healthInsurance * rates.longTermCare / 10) * 10;
  
  // 5. 고용보험
  const employmentInsurance = Math.floor(taxableSalary * rates.employmentInsurance / 10) * 10;
  
  // 6. 소득세 (간이세액표 조회)
  let incomeTax = getIncomeTaxFromTable(taxableSalary, input.dependents);
  
  // 7. 자녀세액공제 (8세~20세 자녀)
  if (input.children8to20 > 0) {
    let childDeduction = 0;
    if (input.children8to20 === 1) {
      childDeduction = 12500;
    } else if (input.children8to20 === 2) {
      childDeduction = 29160;
    } else {
      childDeduction = 29160 + (input.children8to20 - 2) * 25000;
    }
    incomeTax = Math.max(0, incomeTax - childDeduction);
  }
  
  // 8. 지방소득세
  const localIncomeTax = Math.floor(incomeTax * 0.1 / 10) * 10;
  
  // 9. 합계
  const totalDeductions = nationalPension + healthInsurance + longTermCare 
    + employmentInsurance + incomeTax + localIncomeTax;
  const netSalary = monthlySalary - totalDeductions;
  
  return {
    monthlySalary,
    taxableSalary,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    incomeTax,
    localIncomeTax,
    totalDeductions,
    netSalary,
  };
}
```

---

## 4. 간이세액표 데이터 (2024년 기준 - 2025/2026 공통)

간이세액표는 매년 2월경 개정되지만, 2024년 버전이 2025년에도 계속 적용됩니다.
2026년용 간이세액표는 2026년 2월에 발표 예정이며, 현재는 2024년 버전을 사용합니다.

### 데이터 형식

```typescript
interface TaxBracket {
  min: number;  // 월급여 하한 (천원)
  max: number;  // 월급여 상한 (천원)
  taxes: number[];  // 부양가족 1~11명별 세액 (원)
}

const TAX_TABLE: TaxBracket[] = [
  // 세액이 시작되는 구간부터 (약 106만원~)
  { min: 1060, max: 1065, taxes: [1040, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { min: 1065, max: 1070, taxes: [1110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  // ... 전체 데이터는 별도 JSON 파일 참조
];
```

### 주요 구간 샘플 (검증용)

| 월급여(천원) | 1명 | 2명 | 3명 | 4명 |
|-------------|----:|----:|----:|----:|
| 3,000~3,020 | 74,350 | 56,850 | 31,940 | 26,690 |
| 4,000~4,020 | 195,960 | 167,950 | 109,590 | 91,670 |
| 4,100~4,120 | 209,310 | 181,220 | 121,820 | 103,070 |
| 5,000~5,020 | 335,470 | 306,710 | 237,850 | 219,100 |

---

## 5. UI 요구사항

### 입력 필드
1. **연봉** (필수): 숫자 입력, 만원 단위 입력 옵션
2. **비과세액** (선택): 기본값 20만원 (식대 등)
3. **부양가족 수** (필수): 최소 1 (본인), 드롭다운 1~11
4. **8세~20세 자녀 수** (선택): 기본값 0, 드롭다운 0~10
5. **연도 선택**: 2025년 / 2026년 토글

### 출력 결과
1. 월 급여 총액
2. 각 공제 항목별 금액
3. 공제 합계
4. **월 실수령액** (강조)
5. 연간 실수령액

### 추가 기능 (선택)
- 2025년 vs 2026년 비교 보기
- 연봉 구간별 실수령액 차트
- 공유 링크 생성

---

## 6. 검증 케이스

### 테스트 1: 연봉 5,400만원, 부양가족 1명, 비과세 40만원

**2025년 예상:**
- 월급여: 4,500,000원
- 과세급여: 4,100,000원
- 국민연금: 184,500원 (4,100,000 × 4.5%)
- 건강보험: 145,340원 (4,100,000 × 3.545%)
- 장기요양: 18,820원 (145,340 × 12.95%)
- 고용보험: 36,900원 (4,100,000 × 0.9%)
- 소득세: **209,310원** (간이세액표 4,100~4,120 구간, 1명)
- 지방소득세: 20,930원
- **실수령액: 약 3,884,200원**

**2026년 예상:**
- 국민연금: 194,750원 (4,100,000 × 4.75%)
- 건강보험: 147,390원 (4,100,000 × 3.595%)
- 장기요양: 19,370원 (147,390 × 13.14%)
- 고용보험: 36,900원
- 소득세: 209,310원
- 지방소득세: 20,930원
- **실수령액: 약 3,871,350원**
- **2025년 대비 월 12,850원 감소**

---

## 7. 간이세액표 전체 데이터

아래 JSON 파일을 프로젝트에 포함하세요:
- `tax-table-2024.json` (별도 첨부)

```json
[
  {"min":1060,"max":1065,"taxes":[1040,0,0,0,0,0,0,0,0,0,0]},
  {"min":1065,"max":1070,"taxes":[1110,0,0,0,0,0,0,0,0,0,0]},
  ...
]
```

---

## 8. 참고 자료

- 국세청 근로소득 간이세액표 (2024.2.29 개정)
- 국민건강보험공단 보험료율 고시
- 국민연금공단 기준소득월액 고시
- 고용노동부 고용보험료율 고시
