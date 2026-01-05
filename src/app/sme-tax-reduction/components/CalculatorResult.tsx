"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SmeTaxCalculationResult, SmeTaxCalculatorInput } from "../types";
import { formatPeriod, formatDate, formatDateShort } from "../utils/calculator";

interface CalculatorResultProps {
  result: SmeTaxCalculationResult;
  input: SmeTaxCalculatorInput;
}

export default function CalculatorResult({ result, input }: CalculatorResultProps) {
  if (!result.isEligible) {
    return (
      <Card className="rounded-[2rem] border-red-200 bg-red-50">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-2">
                감면 대상이 아닙니다
              </h3>
              <p className="text-red-700">{result.ineligibleReason}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const ResultRow = ({
    number,
    label,
    value,
    subValue,
  }: {
    number: string;
    label: string;
    value: string;
    subValue?: string;
  }) => (
    <div className="py-4 border-b border-text/5 last:border-b-0">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
          {number}
        </span>
        <div className="flex-1">
          <p className="text-sm text-text/50 mb-1">{label}</p>
          <p className="text-lg font-bold text-text">{value}</p>
          {subValue && <p className="text-sm text-text/50 mt-1">{subValue}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="rounded-[2rem]">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h3 className="text-sm font-black text-text/30 uppercase tracking-[0.2em]">
              계산 결과
            </h3>
          </div>

          <ResultRow
            number="5"
            label="중소기업에 취업한 날 연령"
            value={formatPeriod(result.ageAtEmployment)}
            subValue={`취업일: ${formatDateShort(input.employmentDate)}, 생년월일: ${formatDateShort(input.birthDate)}`}
          />

          {input.workerType === "youth" && result.militaryPeriod && (
            <>
              <ResultRow
                number="6"
                label="병역근무기간 (6년 한도)"
                value={formatPeriod(result.militaryPeriod)}
                subValue={
                  input.militaryStartDate && input.militaryEndDate
                    ? `입대일·소집일: ${formatDateShort(input.militaryStartDate)}, 전역일·소집해제일: ${formatDateShort(input.militaryEndDate)}`
                    : undefined
                }
              />
              {result.adjustedAge && (
                <ResultRow
                  number="7"
                  label="병역근무기간 차감 후 연령"
                  value={formatPeriod(result.adjustedAge)}
                />
              )}
            </>
          )}

          {input.workerType === "youth" && !result.militaryPeriod && result.adjustedAge && (
            <ResultRow
              number="7"
              label="병역근무기간 차감 후 연령"
              value={formatPeriod(result.adjustedAge)}
              subValue="병역 미이행"
            />
          )}

          <ResultRow
            number="8"
            label="감면 시작일"
            value={formatDate(result.startDate)}
            subValue="2012.1.1. 이후 소득세 감면을 받은 최초 취업일"
          />

          <ResultRow
            number="9"
            label="감면 종료일"
            value={formatDate(result.endDate)}
            subValue={`시작일부터 ${result.reductionPeriodYears}년이 되는 날이 속하는 달의 말일`}
          />
        </CardContent>
      </Card>

      {/* 혜택 요약 */}
      <Card className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-700">
        <CardContent className="p-8">
          <h3 className="text-sm font-black text-white/50 uppercase tracking-[0.2em] mb-6">
            감면 혜택
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-black text-white">
                {result.reductionRate}%
              </p>
              <p className="text-sm text-white/60 mt-1">감면율</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-white">
                {result.reductionPeriodYears}년
              </p>
              <p className="text-sm text-white/60 mt-1">감면기간</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-white">200만</p>
              <p className="text-sm text-white/60 mt-1">연간 한도</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/70 text-sm text-center">
              {result.workerTypeLabel} 대상 ({WORKER_TYPE_INFO_DISPLAY[input.workerType]})
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 안내 */}
      <Card className="rounded-[2rem]">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            <h4 className="text-sm font-black text-text/30 uppercase tracking-[0.2em]">
              참고 안내
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-text/60">
            <li>• 이 계산 결과는 참고용이며, 실제 감면 여부는 관할 세무서의 판단에 따릅니다.</li>
            <li>• 이직/재취업 시 감면 기간은 최초 취업일 기준으로 계산됩니다.</li>
            <li>• 병역이행 후 1년 이내 동일 중소기업 복직 시 특례가 적용될 수 있습니다.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

const WORKER_TYPE_INFO_DISPLAY: Record<string, string> = {
  youth: "청년 15세~34세",
  senior: "고령자 60세 이상",
  disabled: "장애인",
  careerWoman: "경력단절여성",
};
