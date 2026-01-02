"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CarRecommendation as CarRecommendationType } from "@/types";
import { getCarRecommendation } from "@/services/geminiService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

// 숫자를 천단위 콤마 포맷으로 변환
const formatNumberWithComma = (num: number): string => {
  return num.toLocaleString("ko-KR");
};

// 콤마가 포함된 문자열에서 숫자만 추출
const parseFormattedNumber = (str: string): number => {
  const numbers = str.replace(/[^0-9]/g, "");
  return numbers ? parseInt(numbers, 10) : 0;
};

const CarRecommendation: React.FC = () => {
  const searchParams = useSearchParams();
  const salaryParam = searchParams.get("salary");

  const initialSalary = salaryParam ? parseInt(salaryParam) : 50000000;

  const [salary, setSalary] = useState<number>(initialSalary);
  const [salaryInput, setSalaryInput] = useState<string>(
    formatNumberWithComma(initialSalary)
  );
  const [recommendations, setRecommendations] = useState<
    CarRecommendationType[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL 파라미터로부터 연봉 설정
  useEffect(() => {
    if (salaryParam) {
      const parsed = parseInt(salaryParam);
      if (!isNaN(parsed) && parsed > 0) {
        setSalary(parsed);
        setSalaryInput(formatNumberWithComma(parsed));
      }
    }
  }, [salaryParam]);

  // 입력값 변경 핸들러
  const handleSalaryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFormattedNumber(value);

    // 숫자만 입력 가능
    if (value === "" || /^[0-9,]*$/.test(value)) {
      setSalary(numericValue);
      setSalaryInput(numericValue > 0 ? formatNumberWithComma(numericValue) : "");
    }
  };

  const handleGetRecommendation = async () => {
    setLoading(true);
    setError(null);

    const result = await getCarRecommendation(salary);

    if (result) {
      setRecommendations(result);

      // 로그 저장 (비동기, 실패해도 사용자 경험에 영향 없음)
      try {
        await fetch("/api/car/log", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            annualSalary: salary,
            recommendations: result,
          }),
        });
      } catch {
        // 로그 저장 실패는 무시 (사용자에게 영향 없음)
        console.error("Failed to save car recommendation log");
      }
    } else {
      setError("추천을 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.");
    }

    setLoading(false);
  };

  const formatSalary = (value: number) => {
    return (value / 10000).toLocaleString();
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes("경제")) {
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    }
    if (category.includes("균형")) {
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
          />
        </svg>
      );
    }
    return (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    );
  };

  const getCategoryColor = (category: string) => {
    if (category.includes("경제")) return "from-green-500 to-emerald-600";
    if (category.includes("균형")) return "from-blue-500 to-indigo-600";
    return "from-purple-500 to-pink-600";
  };

  return (
    <>
      {/* 헤더 */}
      <div className="pt-8 pb-8 md:pt-12 md:pb-12 bg-surface">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-black uppercase tracking-widest text-text/60 bg-text/5 rounded-full">
              AI Recommendation
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-text tracking-tight mb-4">
              내 연봉에 맞는 차량 추천
            </h1>
            <p className="text-xl text-text/60 font-semibold leading-relaxed">
              AI가 분석한 연봉 수준에 맞는 합리적인 차량을 추천해드립니다.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container>
        <div className="space-y-8">
          {/* 연봉 입력 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="rounded-[2.5rem] border-text/5 shadow-sm">
              <CardContent className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-black text-text/40 uppercase tracking-widest mb-3">
                      연봉 입력
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={salaryInput}
                        onChange={handleSalaryInputChange}
                        className="w-full text-3xl md:text-4xl font-black text-text bg-transparent border-b-2 border-text/10 focus:border-text/30 outline-none pb-2 pr-10 transition-colors"
                        placeholder="50,000,000"
                      />
                      <span className="absolute right-0 bottom-2 text-xl text-text/40 font-bold">
                        원
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-text/50 font-medium">
                      {formatSalary(salary)}만원
                    </p>
                  </div>

                  <Button
                    onClick={handleGetRecommendation}
                    disabled={loading || salary <= 0}
                    className="h-14 px-8 bg-text text-white font-black rounded-2xl hover:bg-text/90 transition-all text-sm uppercase tracking-widest disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        분석 중...
                      </span>
                    ) : (
                      "차량 추천받기"
                    )}
                  </Button>
                </div>

                {/* 적정 가격대 안내 */}
                {salary > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-blue-50 rounded-2xl"
                  >
                    <p className="text-sm text-blue-800 font-semibold">
                      💡 연봉 {formatSalary(salary)}만원 기준, 적정 차량 가격은{" "}
                      <strong>
                        {formatSalary(Math.round(salary * 0.25))}만원 ~{" "}
                        {formatSalary(Math.round(salary * 0.5))}만원
                      </strong>
                      입니다.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* 에러 메시지 */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="rounded-2xl border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <p className="text-red-700 font-medium">{error}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 로딩 상태 */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-16 space-y-6"
              >
                <div className="w-16 h-16 border-4 border-text/10 border-t-text rounded-full animate-spin" />
                <div className="text-center">
                  <p className="text-lg font-bold text-text">
                    AI가 차량을 분석하고 있습니다
                  </p>
                  <p className="text-sm text-text/50 mt-1">잠시만 기다려주세요...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 추천 결과 */}
          <AnimatePresence>
            {recommendations && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {recommendations.map((category, idx) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="rounded-[2.5rem] border-text/5 shadow-sm overflow-hidden">
                      {/* 카테고리 헤더 */}
                      <div
                        className={`bg-linear-to-r ${getCategoryColor(category.category)} p-6`}
                      >
                        <div className="flex items-center gap-3 text-white">
                          <div className="p-2 bg-white/20 rounded-xl">
                            {getCategoryIcon(category.category)}
                          </div>
                          <h3 className="text-xl font-black">
                            {category.category}
                          </h3>
                        </div>
                      </div>

                      <CardContent className="p-6 md:p-8">
                        {/* 차량 목록 */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                          {category.cars.map((car, carIdx) => (
                            <motion.div
                              key={car.name}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 + carIdx * 0.05 }}
                              className="p-5 bg-surface rounded-2xl hover:bg-text/5 transition-colors"
                            >
                              <h4 className="text-lg font-bold text-text mb-2">
                                {car.name}
                              </h4>
                              <div className="space-y-1 text-sm">
                                <p className="text-text/70">
                                  <span className="font-semibold text-text/50">
                                    가격:
                                  </span>{" "}
                                  {car.priceRange}
                                </p>
                                <p className="text-text/70">
                                  <span className="font-semibold text-text/50">
                                    월 할부:
                                  </span>{" "}
                                  {car.monthlyPayment}
                                </p>
                                <p className="text-text/60 mt-2 italic">
                                  &ldquo;{car.reason}&rdquo;
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* 팁 */}
                        <div className="p-4 bg-amber-50 rounded-xl">
                          <p className="text-sm text-amber-800 font-medium">
                            💡 <strong>구매 팁:</strong> {category.tip}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* 연봉 계산기로 돌아가기 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href="/salary">
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
                                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-text">
                                연봉 계산기로 돌아가기
                              </h4>
                              <p className="text-sm text-text/50 font-medium">
                                실수령액과 4대보험 공제 내역 확인
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* 초기 상태 안내 */}
          {!recommendations && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="rounded-[2.5rem] border-text/5 shadow-sm">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-text/5 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-text/30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">
                    연봉을 입력하고 추천받기 버튼을 눌러주세요
                  </h3>
                  <p className="text-text/50 font-medium">
                    AI가 연봉 수준에 맞는 최적의 차량을 분석해드립니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* 안내 문구 */}
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
                    안내사항
                  </h4>
                </div>
                <div className="grid md:grid-cols-2 gap-10 text-base text-text/50 leading-relaxed font-semibold">
                  <p>
                    본 추천은 AI가 분석한 참고용 정보이며, 실제 구매 결정 시에는
                    본인의 재정 상황, 라이프스타일, 유지비용 등을 종합적으로
                    고려하시기 바랍니다.
                  </p>
                  <p>
                    차량 가격은 시장 상황에 따라 변동될 수 있으며, 할부 조건은
                    금융사 및 개인 신용도에 따라 달라질 수 있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </>
  );
};

export default CarRecommendation;
