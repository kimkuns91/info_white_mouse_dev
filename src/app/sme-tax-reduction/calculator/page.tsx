import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import SmeTaxCalculator from "../components/Calculator";

export const metadata: Metadata = {
  title: `중소기업 소득세 감면 계산기 | ${siteConfig.name}`,
  description:
    "중소기업 취업자 소득세 감면 기간을 자동으로 계산해보세요. 청년, 고령자, 장애인, 경력보유여성 감면 혜택 확인",
  keywords: [
    "중소기업 소득세 감면 계산기",
    "청년 감면 기간",
    "병역 차감 계산",
    "소득세 감면 기간",
  ],
  openGraph: {
    title: `중소기업 소득세 감면 계산기 | ${siteConfig.name}`,
    description:
      "중소기업 취업자 소득세 감면 기간을 자동으로 계산해보세요.",
    url: `${siteConfig.url}/sme-tax-reduction/calculator`,
  },
};

export default function SmeTaxCalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: siteConfig.url },
          { name: "중소기업 소득세 감면", url: `${siteConfig.url}/sme-tax-reduction` },
          {
            name: "감면 기간 계산기",
            url: `${siteConfig.url}/sme-tax-reduction/calculator`,
          },
        ]}
      />

      {/* Hero Section */}
      <div className="pt-8 pb-8 md:pt-12 md:pb-12 bg-surface">
        <Container>
          <Link
            href="/sme-tax-reduction"
            className="inline-flex items-center gap-2 text-sm text-text/50 hover:text-text/80 mb-6 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            제도 자세히 보기
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-black uppercase tracking-widest text-text/60 bg-text/5 rounded-full">
              Calculator
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-text tracking-tight mb-4">
              중소기업 소득세 감면 계산기
            </h1>
            <p className="text-xl text-text/60 font-semibold leading-relaxed">
              감면 기간과 혜택을 미리 확인해보세요.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          <SmeTaxCalculator />
        </div>
      </Container>
    </>
  );
}
