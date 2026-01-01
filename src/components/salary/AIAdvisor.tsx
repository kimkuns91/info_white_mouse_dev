"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Markdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { getFinancialAdvice } from "@/services/geminiService";
import { TaxBreakdown } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  breakdown: TaxBreakdown;
}

const AIAdvisor: React.FC<Props> = ({ breakdown }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 전체화면 시 스크롤 방지
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  const handleGetAdvice = async () => {
    setLoading(true);
    const result = await getFinancialAdvice(breakdown);
    setAdvice(result ?? null);
    setLoading(false);
  };

  const cardContent = (expanded: boolean) => (
    <>
      {/* Decorative gradient */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-500/30 transition-all duration-1000" />

      <CardContent className={`relative z-10 ${expanded ? "p-8 md:p-12" : "p-10"}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-sm font-black tracking-[0.2em] uppercase text-white/70">
              AI 맞춤형 재무 분석
            </h2>
          </div>

          {/* 확장/축소 버튼 - 결과가 있을 때만 표시 */}
          {advice && !loading && (
            <button
              onClick={() => setIsExpanded(!expanded)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={expanded ? "축소" : "확장"}
            >
              {expanded ? (
                // 축소 아이콘
                <svg
                  className="w-5 h-5 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // 확장 아이콘
                <svg
                  className="w-5 h-5 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {!advice && !loading && (
          <div className="space-y-6">
            <p className="text-white/60 text-base font-semibold leading-relaxed">
              현재 입력하신 급여 정보를 바탕으로 <br />
              절세 및 자산 관리 전략을 분석합니다.
            </p>
            <Button
              onClick={handleGetAdvice}
              className="w-full py-5 h-auto bg-surface text-text font-black rounded-2xl hover:bg-white transition-all shadow-xl active:scale-95 text-sm uppercase tracking-widest"
            >
              분석 리포트 생성하기
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center py-10 space-y-6">
            <div className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/40">
              데이터 정밀 분석 중...
            </p>
          </div>
        )}

        {advice && !loading && (
          <div className="space-y-6 animate-fade-in">
            <div
              className={`bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-base leading-loose text-white/90 font-medium prose prose-invert prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-headings:text-white prose-strong:text-white ${
                expanded ? "max-h-[70vh] overflow-y-auto" : "max-h-48 overflow-hidden"
              }`}
            >
              <Markdown>{advice}</Markdown>
            </div>
            {!expanded && (
              <div className="text-center">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-xs font-black text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-[0.2em]"
                >
                  전체 보기
                </button>
              </div>
            )}
            <Button
              variant="ghost"
              onClick={() => setAdvice(null)}
              className="text-xs font-black text-white/30 hover:text-white hover:bg-transparent transition-colors uppercase tracking-[0.3em] block w-full text-center py-2"
            >
              다시 분석하기
            </Button>
          </div>
        )}
      </CardContent>
    </>
  );

  // 전체화면 모달 (Portal로 body에 렌더링)
  const expandedModal = mounted
    ? createPortal(
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* 배경 오버레이 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={() => setIsExpanded(false)}
              />

              {/* 확장된 카드 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
              >
                <Card className="bg-text rounded-[2.5rem] shadow-2xl text-white overflow-hidden relative group border-0 w-full h-full max-w-5xl max-h-[90vh]">
                  {cardContent(true)}
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )
    : null;

  return (
    <>
      <Card className="bg-text rounded-[2.5rem] shadow-2xl text-white overflow-hidden relative group border-0">
        {cardContent(false)}
      </Card>
      {expandedModal}
    </>
  );
};

export default AIAdvisor;
