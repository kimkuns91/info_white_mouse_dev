"use client";

import { useState, useEffect } from "react";

interface LogEntry {
  id: string;
  annualSalary: number;
  userAgent: string | null;
  createdAt: string;
}

interface Distribution {
  label: string;
  count: number;
}

interface Stats {
  total: number;
  avgSalary: number;
  minSalary: number;
  maxSalary: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface LogsResponse {
  logs: LogEntry[];
  pagination: Pagination;
  stats: Stats;
  distribution: Distribution[];
}

export default function CarLogsPage() {
  const [data, setData] = useState<LogsResponse | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/car/logs?page=${page}&limit=20`);
        if (!response.ok) {
          throw new Error("Failed to fetch logs");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, [page]);

  const formatSalary = (salary: number) => {
    return (salary / 10000).toLocaleString() + "만원";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parseUserAgent = (ua: string | null) => {
    if (!ua) return "알 수 없음";
    if (ua.includes("Mobile")) return "모바일";
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac")) return "Mac";
    if (ua.includes("Linux")) return "Linux";
    return "기타";
  };

  const maxCount = data?.distribution.reduce((max, d) => Math.max(max, d.count), 0) || 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">차량 추천 로그</h1>
            <p className="text-sm text-gray-500 mt-1">
              사용자들의 차량 추천 요청 기록
            </p>
          </div>
          <a
            href="/admin/banner-stats"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            배너 통계 보기
          </a>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-2">
              데이터베이스 연결을 확인해주세요.
            </p>
          </div>
        ) : data ? (
          <>
            {/* 통계 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">총 요청 수</p>
                <p className="text-3xl font-bold text-gray-900">
                  {data.stats.total.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">평균 연봉</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatSalary(data.stats.avgSalary)}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">최저 연봉</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatSalary(data.stats.minSalary)}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">최고 연봉</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatSalary(data.stats.maxSalary)}
                </p>
              </div>
            </div>

            {/* 연봉대별 분포 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">연봉대별 분포</h2>
              <div className="space-y-3">
                {data.distribution.map((d) => (
                  <div key={d.label} className="flex items-center gap-4">
                    <div className="w-28 text-sm text-gray-600 font-medium">
                      {d.label}
                    </div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-lg transition-all duration-500"
                        style={{ width: `${(d.count / maxCount) * 100}%` }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-bold text-gray-700">
                      {d.count}건
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 로그 목록 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">최근 요청 목록</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        연봉
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        기기
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        요청 일시
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.logs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">
                            {formatSalary(log.annualSalary)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">
                            {parseUserAgent(log.userAgent)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">
                            {formatDate(log.createdAt)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 페이지네이션 */}
              {data.pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    총 {data.pagination.total}개 중 {(page - 1) * 20 + 1}-
                    {Math.min(page * 20, data.pagination.total)}개
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      이전
                    </button>
                    <span className="px-3 py-1.5 text-sm text-gray-600">
                      {page} / {data.pagination.totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(data.pagination.totalPages, p + 1))
                      }
                      disabled={page === data.pagination.totalPages}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      다음
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
