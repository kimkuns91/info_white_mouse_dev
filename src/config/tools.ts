export interface Tool {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "calculator" | "calendar" | "briefcase" | "wallet";
  status: "active" | "coming-soon";
  features?: string[];
}

export const tools: Tool[] = [
  {
    id: "salary",
    title: "연봉 실수령액 계산기",
    description: "2026년 4대보험 최신 요율 반영! 연봉/월급 입력으로 실수령액을 정확하게 계산합니다.",
    href: "/salary",
    icon: "calculator",
    status: "active",
    features: ["국민연금", "건강보험", "고용보험", "근로소득세"],
  },
  {
    id: "severance",
    title: "퇴직금 계산기",
    description: "근속 연수와 평균 임금을 기반으로 퇴직금을 미리 계산해 볼 수 있습니다.",
    href: "/severance",
    icon: "briefcase",
    status: "coming-soon",
  },
  {
    id: "leave",
    title: "연차 계산기",
    description: "입사일을 기준으로 발생하는 연차 일수와 잔여 연차를 확인할 수 있습니다.",
    href: "/leave",
    icon: "calendar",
    status: "coming-soon",
  },
  {
    id: "unemployment",
    title: "실업급여 계산기",
    description: "고용보험 가입 기간과 퇴직 사유에 따른 예상 실업급여를 계산합니다.",
    href: "/unemployment",
    icon: "wallet",
    status: "coming-soon",
  },
];

export const getToolById = (id: string): Tool | undefined => {
  return tools.find((tool) => tool.id === id);
};

export const getActiveTools = (): Tool[] => {
  return tools.filter((tool) => tool.status === "active");
};
