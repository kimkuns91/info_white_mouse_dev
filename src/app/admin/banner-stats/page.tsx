"use client";

import { useState, useEffect } from "react";
import { BannerStatsChart } from "@/components/admin/BannerStatsChart";

interface DailyStats {
  date: string;
  clicks: number;
  hourly: Record<string, number>;
}

interface BannerStats {
  bannerId: string;
  totalClicks: number;
  daily: DailyStats[];
}

interface AllStats {
  left: BannerStats;
  right: BannerStats;
}

export default function BannerStatsPage() {
  const [stats, setStats] = useState<AllStats | null>(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/banner/stats?days=${days}`);
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [days]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">배너 클릭 통계</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setDays(7)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                days === 7
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              7일
            </button>
            <button
              onClick={() => setDays(30)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                days === 30
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              30일
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-2">
              Vercel KV 환경변수가 설정되어 있는지 확인해주세요.
            </p>
          </div>
        ) : stats ? (
          <>
            {/* 총 클릭 수 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-gray-500">좌측 배너</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.left.totalClicks.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400 mt-1">총 클릭 수</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-500">우측 배너</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.right.totalClicks.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400 mt-1">총 클릭 수</p>
              </div>
            </div>

            {/* 차트 */}
            <BannerStatsChart leftStats={stats.left} rightStats={stats.right} />
          </>
        ) : null}
      </div>
    </div>
  );
}
