"use client";

import React, { useState, useMemo } from "react";
import { SalaryInput } from "@/types";
import { calculateSalary } from "@/utils/calculator";
import CalculatorInput from "./CalculatorInput";
import ResultDisplay from "./ResultDisplay";
import AIAdvisor from "./AIAdvisor";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const SalaryCalculator: React.FC = () => {
  const [input, setInput] = useState<SalaryInput>({
    amount: 40000000,
    isMonthly: false,
    nonTaxable: 200000,
    dependents: 1,
    childrenUnder20: 0,
  });

  const breakdown = useMemo(() => calculateSalary(input), [input]);

  return (
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
        <AIAdvisor breakdown={breakdown} />
      </motion.div>

      {/* Result Column */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-8 space-y-10"
      >
        <ResultDisplay data={breakdown} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="rounded-[2.5rem] border-[#1E293B]/5 shadow-sm">
            <CardContent className="p-10">
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
                />
                <h4 className="text-sm font-black text-[#1E293B]/30 uppercase tracking-[0.25em]">
                  정확도 안내 및 레퍼런스
                </h4>
              </div>
              <div className="grid md:grid-cols-2 gap-10 text-base text-[#1E293B]/50 leading-relaxed font-semibold">
                <p>
                  인포마우스의 모든 데이터와 계산 도구는 국가법령정보센터 및 유관
                  기관의 최신 고시 사항을 정기적으로 모니터링하여 정밀하게
                  반영합니다.
                </p>
                <p>
                  산출된 결과값은 참고용 시뮬레이션이며, 실제 행정 처리 시에는
                  담당 기관이나 전문가의 확인을 거치시는 것을 권장드립니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SalaryCalculator;
