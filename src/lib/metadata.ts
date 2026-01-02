import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadataParams {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  pathname?: string;
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  noIndex = false,
  pathname = "",
}: PageMetadataParams = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${siteConfig.description}`;

  const pageDescription = description || siteConfig.description;
  const pageKeywords = keywords || [...siteConfig.keywords];
  const pageImage = image || siteConfig.ogImage;
  const pageUrl = `${siteConfig.url}${pathname}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: `@${siteConfig.nameEn.toLowerCase()}`,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    verification: {
      // Add verification codes when available
      // google: "google-verification-code",
      // naver: "naver-verification-code",
    },
  };
}

export function generateToolMetadata(
  toolId: string,
  customTitle?: string,
  customDescription?: string
): Metadata {
  const toolMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
    salary: {
      title: "2026 연봉 실수령액 계산기 - 4대보험 최신 요율 반영",
      description:
        "2026년 확정 4대보험 요율(국민연금 4.5%, 건강보험 3.545%) 100% 반영! 연봉/월급 입력하면 실수령액을 바로 계산합니다. 내 월급 변화를 가장 정확하게 확인하세요.",
      keywords: [
        "연봉 실수령액 계산기",
        "2026 연봉 실수령액",
        "연봉 계산기",
        "실수령액 계산기",
        "2026 4대보험 요율",
        "4대보험 계산",
        "근로소득세 계산",
        "월급 실수령액",
        "세후 연봉",
        "급여 계산기",
      ],
    },
    severance: {
      title: "퇴직금 계산기",
      description: "근속 연수와 평균 임금을 기반으로 퇴직금을 미리 계산해 볼 수 있습니다.",
      keywords: ["퇴직금 계산기", "퇴직금 계산", "퇴직금 세금"],
    },
    leave: {
      title: "연차 계산기",
      description: "입사일을 기준으로 발생하는 연차 일수와 잔여 연차를 확인할 수 있습니다.",
      keywords: ["연차 계산기", "연차 일수", "연차 발생"],
    },
    unemployment: {
      title: "실업급여 계산기",
      description: "고용보험 가입 기간과 퇴직 사유에 따른 예상 실업급여를 계산합니다.",
      keywords: ["실업급여 계산기", "실업급여", "고용보험"],
    },
    "salary-table": {
      title: "2026 연봉 실수령액 표",
      description:
        "2026년 연봉별 실수령액을 한눈에 확인하세요. 1000만원부터 1억원까지 연봉 구간별 4대보험, 세금, 실수령액을 표로 정리했습니다.",
      keywords: [
        "연봉 실수령액 표",
        "2026 연봉표",
        "연봉별 실수령액",
        "연봉 세금 표",
        "4대보험 공제표",
        "연봉 실수령액 계산",
        "2026년 연봉",
        "월급 실수령액 표",
      ],
    },
    car: {
      title: "연봉별 차량 추천 - AI 맞춤 분석",
      description:
        "내 연봉에 맞는 적정 차량을 AI가 추천해드립니다. 경제적 선택부터 여유 있는 선택까지, 연봉 수준에 맞는 합리적인 자동차를 찾아보세요.",
      keywords: [
        "연봉별 차량 추천",
        "연봉 자동차 추천",
        "내 연봉에 맞는 차",
        "적정 차량 가격",
        "자동차 구매 가이드",
        "신차 추천",
        "차량 할부 계산",
      ],
    },
  };

  const meta = toolMeta[toolId] || {
    title: customTitle || "도구",
    description: customDescription || siteConfig.description,
    keywords: siteConfig.keywords,
  };

  return generatePageMetadata({
    title: customTitle || meta.title,
    description: customDescription || meta.description,
    keywords: meta.keywords,
    pathname: `/${toolId}`,
  });
}
