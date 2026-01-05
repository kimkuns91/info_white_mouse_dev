"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";

// 날짜 입력 포맷팅 (자동으로 . 추가)
export function formatDateInput(value: string): string {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 4) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 4)}.${numbers.slice(4)}`;
  return `${numbers.slice(0, 4)}.${numbers.slice(4, 6)}.${numbers.slice(6, 8)}`;
}

// 날짜 문자열 파싱 (YYYY.MM.DD 또는 YYYYMMDD 형식)
export function parseDate(dateStr: string): Date | null {
  const cleaned = dateStr.replace(/\D/g, "");
  if (cleaned.length !== 8) return null;

  const year = parseInt(cleaned.substring(0, 4));
  const month = parseInt(cleaned.substring(4, 6)) - 1;
  const day = parseInt(cleaned.substring(6, 8));

  if (year < 1900 || year > 2100) return null;
  if (month < 0 || month > 11) return null;
  if (day < 1 || day > 31) return null;

  return new Date(year, month, day);
}

// 날짜 유효성 검사
export function isValidDate(dateStr: string): boolean {
  return parseDate(dateStr) !== null;
}

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function DateInput({
  label,
  value,
  onChange,
  placeholder = "YYYY.MM.DD",
}: DateInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value);
    onChange(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 숫자, 백스페이스, 탭, 화살표키만 허용
    const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
    if (allowedKeys.includes(e.key)) return;

    // 숫자가 아닌 경우 입력 방지
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <Label className="text-sm font-semibold text-text/70 mb-2 block">
        {label}
      </Label>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={10}
        className="w-full h-11 px-4 rounded-lg border border-text/10 bg-surface text-text placeholder:text-text/30 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
      />
    </div>
  );
}
