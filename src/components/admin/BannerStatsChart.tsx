"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

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

interface BannerStatsChartProps {
  leftStats: BannerStats;
  rightStats: BannerStats;
}

export function BannerStatsChart({ leftStats, rightStats }: BannerStatsChartProps) {
  // 일별 추이 차트 데이터
  const dailyChartData = leftStats.daily.map((leftDay, index) => ({
    date: leftDay.date.slice(5), // MM-DD 형식
    좌측: leftDay.clicks,
    우측: rightStats.daily[index]?.clicks || 0,
  }));

  // 시간대별 분포 데이터 (모든 날짜 합산)
  const hourlyData: Record<string, { left: number; right: number }> = {};
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0");
    hourlyData[hour] = { left: 0, right: 0 };
  }

  leftStats.daily.forEach((day) => {
    Object.entries(day.hourly).forEach(([hour, count]) => {
      if (hourlyData[hour]) {
        hourlyData[hour].left += count;
      }
    });
  });

  rightStats.daily.forEach((day) => {
    Object.entries(day.hourly).forEach(([hour, count]) => {
      if (hourlyData[hour]) {
        hourlyData[hour].right += count;
      }
    });
  });

  const hourlyChartData = Object.entries(hourlyData).map(([hour, data]) => ({
    hour: `${hour}시`,
    좌측: data.left,
    우측: data.right,
  }));

  return (
    <div className="space-y-8">
      {/* 일별 클릭 추이 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">일별 클릭 추이</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="좌측"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="우측"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 시간대별 분포 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">시간대별 분포</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={1} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="좌측" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="우측" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
