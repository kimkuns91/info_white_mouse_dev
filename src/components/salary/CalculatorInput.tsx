"use client";

import React from "react";
import { SalaryInput } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  input: SalaryInput;
  onChange: (input: SalaryInput) => void;
}

// 숫자를 한글 단위로 변환
const formatKoreanCurrency = (value: number): string => {
  if (value === 0) return "";

  const units = ["", "만", "억", "조"];
  const parts: string[] = [];
  let remaining = value;
  let unitIndex = 0;

  while (remaining > 0 && unitIndex < units.length) {
    const part = remaining % 10000;
    if (part > 0) {
      parts.unshift(`${part.toLocaleString()}${units[unitIndex]}`);
    }
    remaining = Math.floor(remaining / 10000);
    unitIndex++;
  }

  return parts.join(" ") + "원";
};

// 숫자를 천 단위 콤마로 포맷
const formatNumber = (value: number): string => {
  return value.toLocaleString("ko-KR");
};

// 문자열에서 숫자만 추출
const parseNumber = (value: string): number => {
  const cleaned = value.replace(/[^\d]/g, "");
  return parseInt(cleaned, 10) || 0;
};

const CalculatorInput: React.FC<Props> = ({ input, onChange }) => {
  const handleAmountChange = (name: string, value: string) => {
    const numValue = parseNumber(value);
    onChange({
      ...input,
      [name]: numValue,
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseNumber(value);
    onChange({
      ...input,
      [name]: numValue,
    });
  };

  return (
    <Card className="rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border-white">
      <CardHeader className="border-b border-surface pb-8">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-black text-text">
            계산기 설정
          </CardTitle>
          <div className="flex bg-surface p-1.5 rounded-2xl">
            <Button
              variant="ghost"
              onClick={() => onChange({ ...input, isMonthly: true })}
              className={`px-6 py-2.5 text-sm font-black rounded-xl transition-all cursor-pointer ${
                input.isMonthly
                  ? "bg-white text-text shadow-md hover:bg-white"
                  : "text-text/30 hover:text-text hover:bg-transparent"
              }`}
            >
              월급
            </Button>
            <Button
              variant="ghost"
              onClick={() => onChange({ ...input, isMonthly: false })}
              className={`px-6 py-2.5 text-sm font-black rounded-xl transition-all cursor-pointer ${
                !input.isMonthly
                  ? "bg-white text-text shadow-md hover:bg-white"
                  : "text-text/30 hover:text-text hover:bg-transparent"
              }`}
            >
              연봉
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8 space-y-8">
        <CurrencyInputGroup
          label={input.isMonthly ? "나의 월 기본급" : "나의 연간 총급여"}
          name="amount"
          value={input.amount}
          onChange={handleAmountChange}
          placeholder="금액을 입력하세요"
        />
        <CurrencyInputGroup
          label="비과세 식대/보조금"
          name="nonTaxable"
          value={input.nonTaxable}
          onChange={handleAmountChange}
          help="보통 식대 20만원 등이 포함됩니다."
        />
        <div className="grid grid-cols-2 gap-6">
          <InputGroup
            label="본인 포함 부양가족"
            name="dependents"
            value={input.dependents}
            onChange={handleNumberChange}
            suffix="명"
          />
          <InputGroup
            label="20세 이하 자녀"
            name="childrenUnder20"
            value={input.childrenUnder20}
            onChange={handleNumberChange}
            suffix="명"
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface CurrencyInputGroupProps {
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: string) => void;
  help?: string;
  placeholder?: string;
}

const CurrencyInputGroup = ({
  label,
  name,
  value,
  onChange,
  help,
  placeholder,
}: CurrencyInputGroupProps) => (
  <div className="group">
    <Label className="block text-base font-black text-text/60 mb-3 px-1">
      {label}
    </Label>
    <div className="relative">
      <Input
        type="text"
        inputMode="numeric"
        name={name}
        value={value > 0 ? formatNumber(value) : ""}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface/60 border-2 border-transparent rounded-2xl p-5 h-auto text-xl font-black text-text focus:bg-white focus:border-text/10 outline-none transition-all placeholder-text/20 cursor-text"
      />
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-base font-bold text-text/30">
        원
      </span>
    </div>
    {value > 0 && (
      <p className="mt-2 px-1 text-sm text-text/50 font-bold">
        {formatKoreanCurrency(value)}
      </p>
    )}
    {help && (
      <p className="mt-2 px-1 text-sm text-text/40 font-medium leading-relaxed">
        {help}
      </p>
    )}
  </div>
);

interface InputGroupProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suffix: string;
  help?: string;
  placeholder?: string;
}

const InputGroup = ({
  label,
  name,
  value,
  onChange,
  suffix,
  help,
  placeholder,
}: InputGroupProps) => (
  <div className="group">
    <Label className="block text-base font-black text-text/60 mb-3 px-1">
      {label}
    </Label>
    <div className="relative">
      <Input
        type="text"
        inputMode="numeric"
        name={name}
        value={value > 0 ? value.toString() : ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-surface/60 border-2 border-transparent rounded-2xl p-5 h-auto text-xl font-black text-text focus:bg-white focus:border-text/10 outline-none transition-all placeholder-text/20 cursor-text"
      />
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-base font-bold text-text/30">
        {suffix}
      </span>
    </div>
    {help && (
      <p className="mt-3 px-1 text-sm text-text/40 font-medium leading-relaxed">
        {help}
      </p>
    )}
  </div>
);

export default CalculatorInput;
