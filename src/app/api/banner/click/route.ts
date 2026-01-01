import { NextRequest, NextResponse } from "next/server";
import { recordBannerClick, BannerId } from "@/lib/banner-tracking";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bannerId } = body as { bannerId: BannerId };

    if (!bannerId || !["left", "right"].includes(bannerId)) {
      return NextResponse.json(
        { error: "Invalid bannerId. Must be 'left' or 'right'" },
        { status: 400 }
      );
    }

    const totalClicks = await recordBannerClick(bannerId);

    return NextResponse.json({
      success: true,
      totalClicks,
    });
  } catch (error) {
    console.error("Banner click tracking error:", error);
    return NextResponse.json(
      { error: "Failed to record click" },
      { status: 500 }
    );
  }
}
