import { Metadata } from "next";
import SalaryCalculator from "@/components/salary/SalaryCalculator";
import { generateToolMetadata } from "@/lib/metadata";
import { WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = generateToolMetadata("salary");

export default function SalaryPage() {
  return (
    <>
      <WebApplicationJsonLd
        name="2026 연봉 실수령액 계산기"
        description="2026년 확정 4대보험 요율 100% 반영! 연봉/월급 입력하면 실수령액을 바로 계산합니다."
        url={`${siteConfig.url}/salary`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: siteConfig.url },
          { name: "연봉 실수령액 계산기", url: `${siteConfig.url}/salary` },
        ]}
      />

      <SalaryCalculator />
    </>
  );
}
