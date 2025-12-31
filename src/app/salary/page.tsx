import { Metadata } from "next";
import SalaryCalculator from "@/components/salary/SalaryCalculator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { generateToolMetadata } from "@/lib/metadata";
import { WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = generateToolMetadata("salary");

export default function SalaryPage() {
  return (
    <>
      <WebApplicationJsonLd
        name="연봉 계산기 - 2025년 실수령액 계산"
        description="2025년 최신 4대보험 요율과 근로소득세 기준으로 연봉/월급의 실수령액을 정확하게 계산합니다."
        url={`${siteConfig.url}/salary`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: siteConfig.url },
          { name: "연봉 계산기", url: `${siteConfig.url}/salary` },
        ]}
      />

      <div className="min-h-screen selection:bg-[#1E293B] selection:text-white">
        <Header />

        <main className="pt-24 pb-20">
          <PageHeader
            badge="Calculator Tools"
            title="연봉 계산기"
            description="4대보험과 세금을 반영한 정확한 월 실수령액을 계산합니다."
          />

          <Container>
            <SalaryCalculator />
          </Container>
        </main>

        <Footer />
      </div>
    </>
  );
}
