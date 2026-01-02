import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // 전체 개수
    const total = await prisma.carRecommendationLog.count();

    // 로그 목록 (최신순)
    const logs = await prisma.carRecommendationLog.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        annualSalary: true,
        userAgent: true,
        createdAt: true,
        // recommendations는 크기가 크므로 목록에서는 제외
      },
    });

    // 통계 데이터
    const stats = await prisma.carRecommendationLog.aggregate({
      _count: { id: true },
      _avg: { annualSalary: true },
      _min: { annualSalary: true },
      _max: { annualSalary: true },
    });

    // 연봉대별 분포
    const salaryRanges = [
      { label: "3천만원 미만", min: 0, max: 30000000 },
      { label: "3천~4천만원", min: 30000000, max: 40000000 },
      { label: "4천~5천만원", min: 40000000, max: 50000000 },
      { label: "5천~6천만원", min: 50000000, max: 60000000 },
      { label: "6천~7천만원", min: 60000000, max: 70000000 },
      { label: "7천~8천만원", min: 70000000, max: 80000000 },
      { label: "8천만원 이상", min: 80000000, max: 999999999 },
    ];

    const distribution = await Promise.all(
      salaryRanges.map(async (range) => {
        const count = await prisma.carRecommendationLog.count({
          where: {
            annualSalary: {
              gte: range.min,
              lt: range.max,
            },
          },
        });
        return { label: range.label, count };
      })
    );

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        total: stats._count.id,
        avgSalary: Math.round(stats._avg.annualSalary || 0),
        minSalary: stats._min.annualSalary || 0,
        maxSalary: stats._max.annualSalary || 0,
      },
      distribution,
    });
  } catch (error) {
    console.error("Error fetching car logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}
