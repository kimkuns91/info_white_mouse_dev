"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SalaryInput } from "@/types";
import { TaxYear, DEFAULT_YEAR } from "@/constants";
import { calculateSalary } from "@/utils/calculator";
import CalculatorInput from "./CalculatorInput";
import ResultDisplay from "./ResultDisplay";
import AIAdvisor from "./AIAdvisor";
import { YearToggle } from "@/components/ui/YearToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { motion, AnimatePresence } from "framer-motion";

const SalaryCalculator: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 연도 파라미터 읽기
  const yearParam = searchParams.get("year");
  const initialYear: TaxYear = yearParam === "2025" ? 2025 : DEFAULT_YEAR;

  const [year, setYear] = useState<TaxYear>(initialYear);
  const [input, setInput] = useState<SalaryInput>({
    amount: 40000000,
    isMonthly: false,
    nonTaxable: 200000,
    dependents: 1,
    childrenUnder20: 0,
    children8to20: 0,
  });

  const breakdown = useMemo(() => calculateSalary(input, year), [input, year]);

  const handleYearChange = (newYear: TaxYear) => {
    setYear(newYear);
    // URL 쿼리 파라미터 업데이트
    const params = new URLSearchParams(searchParams.toString());
    if (newYear === DEFAULT_YEAR) {
      params.delete("year");
    } else {
      params.set("year", newYear.toString());
    }
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.replace(`/salary${newUrl}`, { scroll: false });
  };

  return (
    <>
      {/* 동적 페이지 헤더 */}
      <div className="pt-8 pb-8 md:pt-12 md:pb-12 bg-surface">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`badge-${year}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="inline-block px-4 py-1.5 mb-6 text-sm font-black uppercase tracking-widest text-text/60 bg-text/5 rounded-full"
              >
                {year} Calculator
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${year}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-4xl md:text-5xl font-black text-text tracking-tight mb-4"
              >
                {year} 연봉 계산기
              </motion.h1>
            </AnimatePresence>
            <p className="text-xl text-text/60 font-semibold leading-relaxed">
              {year}년 최신 4대보험 요율과 세금을 반영한 정확한 월 실수령액을
              계산합니다.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container>
        <div className="space-y-8">
          {/* 연도 선택 토글 */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-end"
          >
            <YearToggle year={year} onChange={handleYearChange} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-4 space-y-10"
            >
              <section>
                <CalculatorInput input={input} onChange={setInput} />
              </section>
              {/* AI Advisor - 데스크탑에서만 입력폼 아래 표시 */}
              <div className="hidden lg:block">
                <AIAdvisor breakdown={breakdown} />
              </div>
            </motion.div>

            {/* Result Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-8 space-y-10"
            >
              <ResultDisplay data={breakdown} year={year} />

              {/* AI Advisor - 모바일에서는 결과 바로 아래 표시 */}
              <div className="lg:hidden">
                <AIAdvisor breakdown={breakdown} />
              </div>

              {/* 연봉 실수령액 표 링크 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <Link
                  href={`/salary-table${year !== DEFAULT_YEAR ? `?year=${year}` : ""}`}
                >
                  <Card className="rounded-[2.5rem] border-text/5 shadow-sm hover:shadow-lg hover:border-text/10 transition-all cursor-pointer group">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center group-hover:bg-text/5 transition-colors">
                            <svg
                              className="w-6 h-6 text-text/60"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-text">
                              {year} 연봉 실수령액 표
                            </h4>
                            <p className="text-sm text-text/50 font-medium">
                              1,000만원 ~ 1억원까지 연봉별 실수령액을 한눈에 확인
                            </p>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-text/5 flex items-center justify-center group-hover:bg-text group-hover:text-white transition-all">
                          <svg
                            className="w-5 h-5 text-text/40 group-hover:text-white transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="rounded-[2.5rem] border-text/5 shadow-sm">
                  <CardContent className="p-10">
                    <div className="flex items-center gap-3 mb-8">
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
                        인포마우스의 모든 데이터와 계산 도구는 국가법령정보센터
                        및 유관 기관의 최신 고시 사항을 정기적으로 모니터링하여
                        정밀하게 반영합니다.
                      </p>
                      <p>
                        산출된 결과값은 참고용 시뮬레이션이며, 실제 행정 처리
                        시에는 담당 기관이나 전문가의 확인을 거치시는 것을
                        권장드립니다.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SalaryCalculator;
