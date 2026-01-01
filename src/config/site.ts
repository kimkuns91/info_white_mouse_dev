export const siteConfig = {
  name: "인포마우스",
  nameEn: "InfoMouse",
  description: "어려운 정보도 쉽고 빠르게, 인포마우스가 답을 찾아드립니다",
  url: "https://info.whitemouse.dev",
  ogImage: "https://info.whitemouse.dev/og-image.png",
  author: {
    name: "WhiteMouseDev",
    url: "https://info.whitemouse.dev",
  },
  business: {
    registrationNumber: "634-26-01985",
    email: "whitemousedev@gmail.com",
  },
  keywords: [
    "연봉 계산기",
    "실수령액 계산",
    "세금 계산",
    "4대보험",
    "근로소득세",
    "월급 계산기",
    "급여 계산",
    "인포마우스",
  ],
  links: {},
  creator: "InfoMouse",
  themeColor: "#1E293B",
  locale: "ko_KR",
} as const;

export type SiteConfig = typeof siteConfig;
