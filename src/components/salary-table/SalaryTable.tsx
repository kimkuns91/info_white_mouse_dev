"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateSalary } from "@/utils/calculator";
import { Card, CardContent } from "@/components/ui/card";

interface SalaryRow {
  annual: number;
  monthly: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalDeductions: number;
  netPay: number;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("ko-KR").format(Math.round(num));
};

const formatWon = (num: number): string => {
  return `${formatNumber(num)}원`;
};

const generateSalaryData = (startAmount: number, endAmount: number): SalaryRow[] => {
  const data: SalaryRow[] = [];
  for (let annual = startAmount; annual <= endAmount; annual += 1000000) {
    const result = calculateSalary({
      amount: annual,
      isMonthly: false,
      nonTaxable: 0,
      dependents: 1,
      childrenUnder20: 0,
    });
    data.push({
      annual,
      monthly: annual / 12,
      ...result,
    });
  }
  return data;
};

const salaryRanges = [
  { start: 10000000, end: 19000000, label: "1,000만원 ~ 1,900만원" },
  { start: 20000000, end: 29000000, label: "2,000만원 ~ 2,900만원" },
  { start: 30000000, end: 39000000, label: "3,000만원 ~ 3,900만원" },
  { start: 40000000, end: 49000000, label: "4,000만원 ~ 4,900만원" },
  { start: 50000000, end: 59000000, label: "5,000만원 ~ 5,900만원" },
  { start: 60000000, end: 69000000, label: "6,000만원 ~ 6,900만원" },
  { start: 70000000, end: 79000000, label: "7,000만원 ~ 7,900만원" },
  { start: 80000000, end: 89000000, label: "8,000만원 ~ 8,900만원" },
  { start: 90000000, end: 99000000, label: "9,000만원 ~ 9,900만원" },
  { start: 100000000, end: 109000000, label: "1억원 ~ 1억 900만원" },
  { start: 110000000, end: 119000000, label: "1억 1,000만원 ~ 1억 1,900만원" },
  { start: 120000000, end: 129000000, label: "1억 2,000만원 ~ 1억 2,900만원" },
  { start: 130000000, end: 139000000, label: "1억 3,000만원 ~ 1억 3,900만원" },
  { start: 140000000, end: 149000000, label: "1억 4,000만원 ~ 1억 4,900만원" },
  { start: 150000000, end: 159000000, label: "1억 5,000만원 ~ 1억 5,900만원" },
];

const AccordionItem = ({
  range,
  isOpen,
  onToggle,
  index,
}: {
  range: (typeof salaryRanges)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => {
  const data = isOpen ? generateSalaryData(range.start, range.end) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="rounded-2xl border-text/5 overflow-hidden hover:shadow-md hover:border-text/10 transition-all">
        <button
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-surface/30 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
              <span className="text-sm font-black text-text/60">
                {Math.floor(range.start / 10000000)}
              </span>
            </div>
            <span className="text-lg font-bold text-text">{range.label}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center"
          >
              <svg
                className="w-4 h-4 text-text/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface/80">
                        <th className="px-4 py-3 text-left font-black text-text/50 text-xs uppercase tracking-wider whitespace-nowrap">
                          연봉
                        </th>
                        <th className="px-4 py-3 text-right font-black text-text/50 text-xs uppercase tracking-wider whitespace-nowrap">
                          국민연금
                        </th>
                        <th className="px-4 py-3 text-right font-black text-text/50 text-xs uppercase tracking-wider whitespace-nowrap">
                          건강보험
                        </th>
                        <th className="px-4 py-3 text-right font-black text-text/50 text-xs uppercase tracking-wider whitespace-nowrap">
                          장기요양
                        </th>
                        <th className="px-4 py-3 text-right font-black text-text/50 text-xs uppercase tracking-wider whitespace-nowrap">
                          고용보험
                        </th>
                        <th className="px-4 py-3 text-right font-black text-text/50 text-xs uppercase tracking-wider whitespace-nowrap">
                          소득세
                        </th>
                        <th className="px-4 py-3 text-right font-black text-text/50 text-xs uppercase tracking-wider whitespace-nowrap">
                          지방소득세
                        </th>
                        <th className="px-4 py-3 text-right font-black text-text/50 text-xs uppercase tracking-wider whitespace-nowrap">
                          공제합계
                        </th>
                        <th className="px-4 py-3 text-right font-black text-blue-600 text-xs uppercase tracking-wider whitespace-nowrap">
                          월 실수령액
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, idx) => (
                        <tr
                          key={row.annual}
                          className={`border-t border-surface ${
                            idx % 2 === 0 ? "bg-white" : "bg-surface/30"
                          } hover:bg-surface/60 transition-colors`}
                        >
                          <td className="px-4 py-3 font-bold text-text whitespace-nowrap">
                            {formatNumber(row.annual / 10000)}만원
                          </td>
                          <td className="px-4 py-3 text-right text-text/70 whitespace-nowrap">
                            {formatWon(row.nationalPension)}
                          </td>
                          <td className="px-4 py-3 text-right text-text/70 whitespace-nowrap">
                            {formatWon(row.healthInsurance)}
                          </td>
                          <td className="px-4 py-3 text-right text-text/70 whitespace-nowrap">
                            {formatWon(row.longTermCare)}
                          </td>
                          <td className="px-4 py-3 text-right text-text/70 whitespace-nowrap">
                            {formatWon(row.employmentInsurance)}
                          </td>
                          <td className="px-4 py-3 text-right text-text/70 whitespace-nowrap">
                            {formatWon(row.incomeTax)}
                          </td>
                          <td className="px-4 py-3 text-right text-text/70 whitespace-nowrap">
                            {formatWon(row.localIncomeTax)}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-red-500 whitespace-nowrap">
                            {formatWon(row.totalDeductions)}
                          </td>
                          <td className="px-4 py-3 text-right font-black text-text whitespace-nowrap">
                            {formatWon(row.netPay)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default function SalaryTable() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="rounded-[2rem] border-text/5 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0"
              >
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
              <div className="space-y-2">
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="font-bold text-text"
                >
                  계산 기준 안내
                </motion.h3>
                <ul className="text-sm text-text/60 space-y-1">
                  {[
                    "2026년 4대보험 요율 및 근로소득세 기준 적용",
                    "부양가족 1인(본인) 기준, 비과세 수당 미적용",
                    "실제 실수령액은 개인 상황에 따라 다를 수 있습니다",
                  ].map((text, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    >
                      • {text}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-3">
        {salaryRanges.map((range, index) => (
          <AccordionItem
            key={range.start}
            range={range}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
            index={index}
          />
        ))}
      </div>

      <Card className="rounded-[2rem] border-text/5 shadow-sm">
        <CardContent className="p-10">
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
            />
            <h4 className="text-sm font-black text-text/30 uppercase tracking-[0.25em]">
              정확도 안내 및 레퍼런스
            </h4>
          </div>
          <div className="grid md:grid-cols-2 gap-10 text-base text-text/50 leading-relaxed font-semibold">
            <p>
              인포마우스의 모든 데이터와 계산 도구는 국가법령정보센터 및 유관 기관의
              최신 고시 사항을 정기적으로 모니터링하여 정밀하게 반영합니다.
            </p>
            <p>
              산출된 결과값은 참고용 시뮬레이션이며, 실제 행정 처리 시에는 담당 기관이나
              전문가의 확인을 거치시는 것을 권장드립니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
