import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { generateToolMetadata } from "@/lib/metadata";
import {
  WebApplicationJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import SalaryTable from "@/components/salary-table/SalaryTable";

export const metadata: Metadata = generateToolMetadata("salary-table");

export default function SalaryTablePage() {
  return (
    <>
      <WebApplicationJsonLd
        name="2026 연봉 실수령액 표"
        description="2026년 연봉별 실수령액을 한눈에 확인하세요. 1000만원부터 1억원까지 연봉 구간별 4대보험, 세금, 실수령액을 표로 정리했습니다."
        url={`${siteConfig.url}/salary-table`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: siteConfig.url },
          { name: "연봉 실수령액 표", url: `${siteConfig.url}/salary-table` },
        ]}
      />

      <PageHeader
        badge="2026 Salary Table"
        title="2026 연봉 실수령액 표"
        description="연봉별 4대보험, 세금 공제 후 실수령액을 한눈에 확인하세요."
      />

      <Container>
        <SalaryTable />
      </Container>
    </>
  );
}
