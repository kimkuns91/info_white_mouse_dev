export interface NavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  {
    title: "홈",
    href: "/",
  },
  {
    title: "연봉 계산기",
    href: "/salary",
    description: "2026년 기준 실수령액을 계산해보세요",
  },
  {
    title: "연봉 실수령액 표",
    href: "/salary-table",
    description: "연봉별 실수령액을 한눈에 확인",
  },
  {
    title: "퇴직금 계산기",
    href: "/severance",
    description: "퇴직금을 미리 계산해보세요",
    disabled: true,
  },
  {
    title: "연차 계산기",
    href: "/leave",
    description: "연차 발생 일수를 확인하세요",
    disabled: true,
  },
  {
    title: "실업급여 계산기",
    href: "/unemployment",
    description: "예상 실업급여를 알아보세요",
    disabled: true,
  },
];

export const footerNav = {
  tools: mainNav.slice(1),
  legal: [
    {
      title: "이용약관",
      href: "/terms",
    },
    {
      title: "개인정보처리방침",
      href: "/privacy",
    },
  ],
  social: [
    {
      title: "GitHub",
      href: "https://github.com/infomouse",
      external: true,
    },
  ],
};
