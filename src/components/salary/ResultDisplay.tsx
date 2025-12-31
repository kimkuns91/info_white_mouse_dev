"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TaxBreakdown } from "@/types";
import { formatCurrency } from "@/utils/calculator";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  data: TaxBreakdown;
}

const AnimatedNumber = ({ value }: { value: string }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
};

const ResultDisplay: React.FC<Props> = ({ data }) => {
  const chartData = [
    { name: "실수령액", value: data.netPay, color: "#1E293B" },
    { name: "공제합계", value: data.totalDeductions, color: "#E2E8F0" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border-white overflow-hidden">
        <CardContent className="p-8 md:p-12">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* Left: Summary */}
            <div className="md:col-span-3 space-y-10">
              <div>
                <span className="text-base font-bold text-[#1E293B]/50 uppercase tracking-widest block mb-3">
                  월 예상 실수령액
                </span>
                <motion.h3
                  key={data.netPay}
                  initial={{ scale: 1.02 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-5xl md:text-6xl font-black text-[#1E293B] tracking-tight flex items-baseline gap-2"
                >
                  <AnimatedNumber
                    value={formatCurrency(data.netPay).replace("₩", "")}
                  />
                  <span className="text-2xl font-bold text-[#1E293B]/60">원</span>
                </motion.h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="bg-[#F0EFEC] p-6 rounded-2xl border border-[#1E293B]/5"
                >
                  <span className="text-sm font-black text-[#1E293B]/40 uppercase tracking-wider block mb-2">
                    공제액 합계
                  </span>
                  <p className="text-2xl font-black text-red-500">
                    <AnimatedNumber value={formatCurrency(data.totalDeductions)} />
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="bg-[#1E293B] p-6 rounded-2xl shadow-xl shadow-[#1E293B]/20"
                >
                  <span className="text-sm font-black text-white/40 uppercase tracking-wider block mb-2">
                    총 공제율
                  </span>
                  <p className="text-2xl font-black text-white">
                    <AnimatedNumber
                      value={`${((data.totalDeductions / data.grossPay) * 100).toFixed(1)}%`}
                    />
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right: Chart */}
            <div className="md:col-span-2 flex flex-col items-center justify-center">
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-56 w-56 relative"
              >
                {/* Center Label */}
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none z-0">
                  <span className="text-[10px] font-black text-[#1E293B]/20 uppercase tracking-[0.3em] mb-1">
                    RATIO
                  </span>
                  <span className="text-sm font-black text-[#1E293B]">
                    실수령 비중
                  </span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                      className="z-10 focus:outline-none"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          style={{ outline: "none" }}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                      wrapperStyle={{ zIndex: 100 }}
                      contentStyle={{
                        borderRadius: "20px",
                        border: "none",
                        boxShadow:
                          "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                        background: "#FFFFFF",
                        padding: "12px 16px",
                        fontSize: "14px",
                        fontWeight: "800",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </div>

          {/* Details Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-16 space-y-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <h4 className="text-sm font-black text-[#1E293B]/30 uppercase tracking-[0.3em] whitespace-nowrap">
                공제 상세 내역
              </h4>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="h-[1px] bg-[#F0EFEC]"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-2">
              <DetailRow label="국민연금" value={data.nationalPension} delay={0.1} />
              <DetailRow label="건강보험" value={data.healthInsurance} delay={0.15} />
              <DetailRow label="장기요양보험" value={data.longTermCare} delay={0.2} />
              <DetailRow label="고용보험" value={data.employmentInsurance} delay={0.25} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="md:col-span-2 my-2 h-[1px] bg-[#F0EFEC]"
              />
              <DetailRow label="근로소득세" value={data.incomeTax} isBold delay={0.35} />
              <DetailRow label="지방소득세" value={data.localIncomeTax} isBold delay={0.4} />
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DetailRow = ({
  label,
  value,
  isBold,
  delay = 0,
}: {
  label: string;
  value: number;
  isBold?: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay }}
    whileHover={{ x: 4 }}
    className={`flex justify-between items-center py-3 ${
      isBold ? "text-[#1E293B]" : "text-[#1E293B]/70"
    }`}
  >
    <span className={`text-base font-bold ${isBold ? "text-lg" : ""}`}>
      {label}
    </span>
    <span
      className={`text-base font-black ${
        isBold
          ? "text-lg underline decoration-[#F0EFEC] decoration-4 underline-offset-4"
          : ""
      }`}
    >
      <AnimatedNumber value={formatCurrency(value)} />
    </span>
  </motion.div>
);

export default ResultDisplay;
