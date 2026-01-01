import { NextRequest, NextResponse } from "next/server";
import { getBannerStats, getAllBannerStats, BannerId } from "@/lib/banner-tracking";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bannerId = searchParams.get("bannerId") as BannerId | null;
    const days = parseInt(searchParams.get("days") || "7", 10);

    if (days < 1 || days > 90) {
      return NextResponse.json(
        { error: "Days must be between 1 and 90" },
        { status: 400 }
      );
    }

    if (bannerId) {
      if (!["left", "right"].includes(bannerId)) {
        return NextResponse.json(
          { error: "Invalid bannerId. Must be 'left' or 'right'" },
          { status: 400 }
        );
      }
      const stats = await getBannerStats(bannerId, days);
      return NextResponse.json(stats);
    }

    const allStats = await getAllBannerStats(days);
    return NextResponse.json(allStats);
  } catch (error) {
    console.error("Banner stats fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
