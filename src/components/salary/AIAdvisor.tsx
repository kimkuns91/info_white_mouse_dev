"use client";

import React, { useState } from 'react';
import { getFinancialAdvice } from '@/services/geminiService';
import { TaxBreakdown } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  breakdown: TaxBreakdown;
}

const AIAdvisor: React.FC<Props> = ({ breakdown }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const result = await getFinancialAdvice(breakdown);
    setAdvice(result ?? null);
    setLoading(false);
  };

  return (
    <Card className="bg-[#1E293B] rounded-[2.5rem] shadow-2xl text-white overflow-hidden relative group border-0">
      {/* Decorative gradient */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-500/30 transition-all duration-1000"></div>

      <CardContent className="p-10 relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-sm font-black tracking-[0.2em] uppercase text-white/70">AI 맞춤형 재무 분석</h2>
        </div>

        {!advice && !loading && (
          <div className="space-y-6">
            <p className="text-white/60 text-base font-semibold leading-relaxed">
              현재 입력하신 급여 정보를 바탕으로 <br />절세 및 자산 관리 전략을 분석합니다.
            </p>
            <Button
              onClick={handleGetAdvice}
              className="w-full py-5 h-auto bg-[#F0EFEC] text-[#1E293B] font-black rounded-2xl hover:bg-white transition-all shadow-xl active:scale-95 text-sm uppercase tracking-widest"
            >
              분석 리포트 생성하기
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center py-10 space-y-6">
            <div className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/40">데이터 정밀 분석 중...</p>
          </div>
        )}

        {advice && !loading && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-base leading-loose text-white/90 font-medium whitespace-pre-wrap">
              {advice}
            </div>
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
    </Card>
  );
};

export default AIAdvisor;
