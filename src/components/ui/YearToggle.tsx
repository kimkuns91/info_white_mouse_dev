"use client";

import { motion } from "framer-motion";
import { TaxYear } from "@/constants";

interface YearToggleProps {
  year: TaxYear;
  onChange: (year: TaxYear) => void;
}

export function YearToggle({ year, onChange }: YearToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-bold text-text/50">적용 연도</span>
      <div className="relative flex bg-surface rounded-xl p-1">
        <motion.div
          className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm"
          initial={false}
          animate={{
            left: year === 2025 ? "4px" : "50%",
            width: "calc(50% - 4px)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <button
          onClick={() => onChange(2025)}
          className={`relative z-10 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            year === 2025 ? "text-text" : "text-text/40 hover:text-text/60"
          }`}
        >
          2025년
        </button>
        <button
          onClick={() => onChange(2026)}
          className={`relative z-10 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            year === 2026 ? "text-text" : "text-text/40 hover:text-text/60"
          }`}
        >
          2026년
        </button>
      </div>
    </div>
  );
}
