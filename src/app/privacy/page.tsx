import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${siteConfig.name} 개인정보처리방침입니다.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="개인정보처리방침"
        description="개인정보 보호에 관한 정책입니다."
      />

      <Container size="narrow">
        <div className="py-12 prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">1. 개인정보의 처리 목적</h2>
            <p className="text-text/80 leading-relaxed">
              {siteConfig.name}(이하 &quot;서비스&quot;)는 다음의 목적을 위하여 개인정보를 처리합니다.
              처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
              이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc list-inside text-text/80 space-y-2 mt-4">
              <li>서비스 제공 및 운영</li>
              <li>서비스 이용 통계 및 분석</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">2. 수집하는 개인정보 항목</h2>
            <p className="text-text/80 leading-relaxed">
              서비스는 별도의 회원가입 없이 이용 가능하며, 다음과 같은 정보를 자동으로 수집할 수 있습니다.
            </p>
            <ul className="list-disc list-inside text-text/80 space-y-2 mt-4">
              <li>접속 IP 주소</li>
              <li>브라우저 종류 및 버전</li>
              <li>접속 일시</li>
              <li>방문 페이지</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-text/80 leading-relaxed">
              서비스는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체없이 해당 개인정보를 파기합니다. 자동 수집되는 정보는 수집일로부터 1년간 보관 후 파기합니다.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="text-text/80 leading-relaxed">
              서비스는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
              다만, 아래의 경우에는 예외로 합니다.
            </p>
            <ul className="list-disc list-inside text-text/80 space-y-2 mt-4">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">5. 쿠키의 사용</h2>
            <p className="text-text/80 leading-relaxed">
              서비스는 이용자에게 더 나은 서비스를 제공하기 위해 쿠키를 사용할 수 있습니다.
              쿠키는 웹사이트가 이용자의 브라우저로 전송하는 소량의 정보입니다.
              이용자는 브라우저 설정을 통해 쿠키를 거부할 수 있으나, 이 경우 서비스 이용에 제한이 있을 수 있습니다.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">6. 개인정보의 안전성 확보 조치</h2>
            <p className="text-text/80 leading-relaxed">서비스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <ul className="list-disc list-inside text-text/80 space-y-2 mt-4">
              <li>개인정보의 암호화</li>
              <li>해킹 등에 대비한 기술적 대책</li>
              <li>개인정보에 대한 접근 제한</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">7. 개인정보 보호책임자</h2>
            <p className="text-text/80 leading-relaxed">
              서비스는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
              이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="mt-4 p-4 bg-surface rounded-lg">
              <p className="text-text/80">
                <strong>개인정보 보호책임자</strong><br />
                이름: WhiteMouseDev<br />
                이메일: whitemousedev@gmail.com
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-text mb-4">8. 권익침해 구제방법</h2>
            <p className="text-text/80 leading-relaxed">
              이용자는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회,
              한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.
            </p>
            <ul className="list-disc list-inside text-text/80 space-y-2 mt-4">
              <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
              <li>개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
              <li>대검찰청: (국번없이) 1301 (www.spo.go.kr)</li>
              <li>경찰청: (국번없이) 182 (ecrm.cyber.go.kr)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text mb-4">9. 개인정보처리방침 변경</h2>
            <p className="text-text/80 leading-relaxed">
              이 개인정보처리방침은 2026년 1월 1일부터 적용됩니다.
              이전의 개인정보처리방침은 아래에서 확인하실 수 있습니다.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
