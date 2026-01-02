import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { CarRecommendation } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { annualSalary, recommendations } = body as {
      annualSalary: number;
      recommendations: CarRecommendation[];
    };

    if (!annualSalary || !recommendations) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get("user-agent") || undefined;

    const log = await prisma.carRecommendationLog.create({
      data: {
        annualSalary,
        recommendations: JSON.parse(JSON.stringify(recommendations)),
        userAgent,
      },
    });

    return NextResponse.json({ success: true, id: log.id });
  } catch (error) {
    console.error("Error saving car recommendation log:", error);
    return NextResponse.json(
      { error: "Failed to save log" },
      { status: 500 }
    );
  }
}
