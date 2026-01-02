-- CreateTable
CREATE TABLE "car_recommendation_logs" (
    "id" TEXT NOT NULL,
    "annualSalary" INTEGER NOT NULL,
    "recommendations" JSONB NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "car_recommendation_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "car_recommendation_logs_annualSalary_idx" ON "car_recommendation_logs"("annualSalary");

-- CreateIndex
CREATE INDEX "car_recommendation_logs_createdAt_idx" ON "car_recommendation_logs"("createdAt");
