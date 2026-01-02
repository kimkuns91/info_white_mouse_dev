import { Metadata } from "next";
import CarRecommendation from "@/components/car/CarRecommendation";
import { generateToolMetadata } from "@/lib/metadata";
import { WebApplicationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = generateToolMetadata("car");

export default function CarPage() {
  return (
    <>
      <WebApplicationJsonLd
        name="연봉별 차량 추천"
        description="내 연봉에 맞는 적정 차량을 AI가 추천해드립니다."
        url={`${siteConfig.url}/car`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: siteConfig.url },
          { name: "연봉별 차량 추천", url: `${siteConfig.url}/car` },
        ]}
      />

      <CarRecommendation />
    </>
  );
}
