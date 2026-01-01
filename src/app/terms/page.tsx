import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "이용약관",
  description: `${siteConfig.name} 서비스 이용약관입니다.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHeader title="이용약관" description="서비스 이용에 관한 약관입니다." />

      <Container size="narrow">
        <div className="py-12 prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">제1조 (목적)</h2>
            <p className="text-text/80 leading-relaxed">
              본 약관은 {siteConfig.name}(이하 &quot;서비스&quot;)가 제공하는 모든 서비스의 이용 조건 및
              절차, 이용자와 서비스의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">제2조 (정의)</h2>
            <ul className="list-disc list-inside text-text/80 space-y-2">
              <li>&quot;서비스&quot;란 {siteConfig.name}가 제공하는 연봉 계산기 등 각종 계산 도구를 말합니다.</li>
              <li>&quot;이용자&quot;란 본 서비스에 접속하여 이 약관에 따라 서비스를 이용하는 자를 말합니다.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">제3조 (약관의 효력 및 변경)</h2>
            <ol className="list-decimal list-inside text-text/80 space-y-2">
              <li>본 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.</li>
              <li>서비스는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지합니다.</li>
              <li>이용자가 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.</li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">제4조 (서비스의 제공)</h2>
            <ol className="list-decimal list-inside text-text/80 space-y-2">
              <li>서비스는 연봉 계산, 세금 계산 등 각종 계산 도구를 무료로 제공합니다.</li>
              <li>서비스는 연중무휴 24시간 제공함을 원칙으로 하나, 시스템 점검 등의 사유로 일시 중단될 수 있습니다.</li>
              <li>서비스에서 제공하는 계산 결과는 참고용이며, 실제 금액과 차이가 있을 수 있습니다.</li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">제5조 (이용자의 의무)</h2>
            <ol className="list-decimal list-inside text-text/80 space-y-2">
              <li>이용자는 서비스를 이용할 때 관계 법령, 본 약관의 규정을 준수하여야 합니다.</li>
              <li>이용자는 서비스의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.</li>
              <li>이용자는 서비스를 통해 얻은 정보를 상업적 목적으로 무단 복제, 배포할 수 없습니다.</li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">제6조 (면책조항)</h2>
            <ol className="list-decimal list-inside text-text/80 space-y-2">
              <li>서비스는 천재지변, 시스템 장애 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.</li>
              <li>서비스에서 제공하는 계산 결과의 정확성을 보장하지 않으며, 이로 인한 손해에 대해 책임을 지지 않습니다.</li>
              <li>이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대해 책임을 지지 않습니다.</li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">제7조 (저작권)</h2>
            <p className="text-text/80 leading-relaxed">
              서비스가 작성한 저작물에 대한 저작권 및 기타 지적재산권은 서비스에 귀속됩니다.
              이용자는 서비스를 이용하여 얻은 정보를 서비스의 사전 승낙 없이 복제, 전송, 출판, 배포,
              방송 등 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 할 수 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text mb-4">부칙</h2>
            <p className="text-text/80 leading-relaxed">본 약관은 2026년 1월 1일부터 시행됩니다.</p>
          </section>
        </div>
      </Container>
    </>
  );
}
