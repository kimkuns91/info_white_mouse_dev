"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SmeTaxCalculatorInput, WorkerType, WORKER_TYPE_INFO } from "../types";
import { calculateSmeTaxReduction } from "../utils/calculator";
import CalculatorResult from "./CalculatorResult";
import DateInput, { parseDate, isValidDate } from "./DateInput";

export default function SmeTaxCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");
  const [workerType, setWorkerType] = useState<WorkerType>("youth");
  const [hasMilitaryService, setHasMilitaryService] = useState(false);
  const [militaryStartDate, setMilitaryStartDate] = useState("");
  const [militaryEndDate, setMilitaryEndDate] = useState("");
  const [showResult, setShowResult] = useState(false);

  const canCalculate = useMemo(() => {
    if (!isValidDate(birthDate) || !isValidDate(employmentDate)) return false;
    if (
      workerType === "youth" &&
      hasMilitaryService &&
      (!isValidDate(militaryStartDate) || !isValidDate(militaryEndDate))
    ) {
      return false;
    }
    return true;
  }, [birthDate, employmentDate, workerType, hasMilitaryService, militaryStartDate, militaryEndDate]);

  const result = useMemo(() => {
    if (!showResult || !canCalculate) return null;

    const parsedBirthDate = parseDate(birthDate);
    const parsedEmploymentDate = parseDate(employmentDate);
    const parsedMilitaryStartDate = parseDate(militaryStartDate);
    const parsedMilitaryEndDate = parseDate(militaryEndDate);

    if (!parsedBirthDate || !parsedEmploymentDate) return null;

    const input: SmeTaxCalculatorInput = {
      birthDate: parsedBirthDate,
      employmentDate: parsedEmploymentDate,
      workerType,
      hasMilitaryService: workerType === "youth" && hasMilitaryService,
      militaryStartDate:
        workerType === "youth" && hasMilitaryService && parsedMilitaryStartDate
          ? parsedMilitaryStartDate
          : undefined,
      militaryEndDate:
        workerType === "youth" && hasMilitaryService && parsedMilitaryEndDate
          ? parsedMilitaryEndDate
          : undefined,
    };

    return calculateSmeTaxReduction(input);
  }, [showResult, canCalculate, birthDate, employmentDate, workerType, hasMilitaryService, militaryStartDate, militaryEndDate]);

  const handleCalculate = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setBirthDate("");
    setEmploymentDate("");
    setWorkerType("youth");
    setHasMilitaryService(false);
    setMilitaryStartDate("");
    setMilitaryEndDate("");
    setShowResult(false);
  };

  // 결과용 input 데이터 생성
  const getResultInput = (): SmeTaxCalculatorInput | null => {
    const parsedBirthDate = parseDate(birthDate);
    const parsedEmploymentDate = parseDate(employmentDate);
    if (!parsedBirthDate || !parsedEmploymentDate) return null;

    return {
      birthDate: parsedBirthDate,
      employmentDate: parsedEmploymentDate,
      workerType,
      hasMilitaryService: workerType === "youth" && hasMilitaryService,
      militaryStartDate:
        workerType === "youth" && hasMilitaryService
          ? parseDate(militaryStartDate) || undefined
          : undefined,
      militaryEndDate:
        workerType === "youth" && hasMilitaryService
          ? parseDate(militaryEndDate) || undefined
          : undefined,
    };
  };

  const resultInput = getResultInput();

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* 입력 폼 */}
      <Card className="rounded-[2rem]">
        <CardContent className="p-8 space-y-6">
          <DateInput
            label="생년월일"
            value={birthDate}
            onChange={(val) => {
              setBirthDate(val);
              setShowResult(false);
            }}
          />

          <DateInput
            label="취업일 (입사일)"
            value={employmentDate}
            onChange={(val) => {
              setEmploymentDate(val);
              setShowResult(false);
            }}
          />

          <div>
            <Label className="text-sm font-semibold text-text/70 mb-2 block">
              취업자 유형
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(WORKER_TYPE_INFO) as WorkerType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setWorkerType(type);
                    setShowResult(false);
                    if (type !== "youth") {
                      setHasMilitaryService(false);
                    }
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    workerType === type
                      ? "bg-blue-600 text-white"
                      : "bg-surface text-text/70 hover:bg-text/5"
                  }`}
                >
                  {WORKER_TYPE_INFO[type].label}
                </button>
              ))}
            </div>
          </div>

          {workerType === "youth" && (
            <div className="space-y-4 p-4 bg-surface rounded-xl">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasMilitaryService}
                  onChange={(e) => {
                    setHasMilitaryService(e.target.checked);
                    setShowResult(false);
                  }}
                  className="w-5 h-5 rounded border-text/20 text-blue-600 focus:ring-blue-500/20"
                />
                <span className="text-sm font-semibold text-text/70">
                  병역 이행 여부 (청년만 해당)
                </span>
              </label>

              {hasMilitaryService && (
                <div className="space-y-4 pt-2">
                  <DateInput
                    label="군입대일 (소집일)"
                    value={militaryStartDate}
                    onChange={(val) => {
                      setMilitaryStartDate(val);
                      setShowResult(false);
                    }}
                  />
                  <DateInput
                    label="군전역일 (소집해제일)"
                    value={militaryEndDate}
                    onChange={(val) => {
                      setMilitaryEndDate(val);
                      setShowResult(false);
                    }}
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleCalculate}
              disabled={!canCalculate}
              className="flex-1 h-12 rounded-xl"
            >
              계산하기
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-12 px-6 rounded-xl"
            >
              초기화
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 결과 */}
      <div>
        {result && resultInput ? (
          <CalculatorResult result={result} input={resultInput} />
        ) : (
          <Card className="rounded-[2rem] h-full">
            <CardContent className="p-8 h-full flex items-center justify-center">
              <div className="text-center text-text/40">
                <svg
                  className="w-16 h-16 mx-auto mb-4 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <p className="font-semibold">
                  정보를 입력하고 계산하기 버튼을 눌러주세요
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
