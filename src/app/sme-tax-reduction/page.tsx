import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: `중소기업 취업자 소득세 감면 | ${siteConfig.name}`,
  description:
    "중소기업에 취업한 청년, 고령자, 장애인, 경력보유여성을 위한 소득세 감면 제도를 알아보세요. 신청 방법 및 양식 다운로드",
  keywords: [
    "중소기업 소득세 감면",
    "청년 세금 감면",
    "소득세 감면 신청서",
    "중소기업 취업자 혜택",
    "소득세 감면 대상",
  ],
  openGraph: {
    title: `중소기업 취업자 소득세 감면 | ${siteConfig.name}`,
    description:
      "중소기업에 취업한 청년, 고령자, 장애인, 경력보유여성을 위한 소득세 감면 제도를 알아보세요.",
    url: `${siteConfig.url}/sme-tax-reduction`,
  },
};

export default function SmeTaxReductionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: siteConfig.url },
          { name: "중소기업 소득세 감면", url: `${siteConfig.url}/sme-tax-reduction` },
        ]}
      />

      {/* Hero Section */}
      <div className="pt-8 pb-8 md:pt-12 md:pb-12 bg-surface">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-black uppercase tracking-widest text-text/60 bg-text/5 rounded-full">
              Tax Reduction
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-text tracking-tight mb-4">
              중소기업 취업자 소득세 감면
            </h1>
            <p className="text-xl text-text/60 font-semibold leading-relaxed mb-8">
              연 최대 200만원까지 소득세를 돌려받으세요.
              <br />
              중소기업에 취업한 청년, 고령자, 장애인, 경력단절여성이라면 소득세를
              감면받을 수 있어요.
            </p>
            <Link href="/sme-tax-reduction/calculator">
              <Button size="lg" className="rounded-full px-8">
                감면 기간 계산하기
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12 space-y-16">
          {/* 제도 개요 */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-6">
              제도가 생긴 지 10년이 넘었지만, 아직도 모르는 분이 많아요
            </h2>
            <div className="prose prose-lg max-w-none text-text/70">
              <p>
                회사에서도 잘 몰라서 안내해 주지 못할뿐더러, 중소기업에 취업한 당사자
                역시 누군가 알려주지 않는 이상 이 제도를 스스로 알 겨를이 없어 그냥
                지나치는 경우가 많죠. 게다가 <strong>직접 신청해야만 받을 수 있는
                혜택</strong>이라 많은 분이 놓치고 있어요.
              </p>
            </div>
          </section>

          {/* 감면 대상자 */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-6">
              소득세 감면 혜택을 받을 수 있는 근로자
            </h2>
            <p className="text-text/70 mb-8">
              모든 중소기업 취업자에게 소득세 감면 혜택이 적용되는 건 아니에요. 아래
              요건을 충족하는 분들만 혜택을 받을 수 있어요.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { type: "청년", condition: "15세 ~ 34세", rate: "90%", period: "5년" },
                { type: "고령자", condition: "60세 이상", rate: "70%", period: "3년" },
                { type: "장애인", condition: "연령 무관", rate: "70%", period: "3년" },
                {
                  type: "경력단절여성",
                  condition: "연령 무관",
                  rate: "70%",
                  period: "3년",
                },
              ].map((item) => (
                <Card key={item.type} className="rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-text mb-2">{item.type}</h3>
                    <p className="text-sm text-text/50 mb-4">{item.condition}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-text/60">감면율</span>
                      <span className="font-bold text-blue-600">{item.rate}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-text/60">기간</span>
                      <span className="font-bold text-text">{item.period}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="rounded-2xl bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <p className="text-amber-800 text-sm">
                  <strong>※ 청년의 경우</strong> 병역 복무기간(최대 6년)은 연령 계산에서
                  차감됩니다.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 제외 대상 */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-6">
              감면 대상에서 제외되는 경우
            </h2>
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <ul className="space-y-3 text-text/70">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✕</span>
                    해당 회사의 임원 또는 최대주주
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✕</span>
                    최대주주의 배우자나 자녀 등 특수관계인
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✕</span>
                    일용근로자
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✕</span>
                    건강보험료(직장가입자) 납부이력이 없는 분
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 대상 기업 */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-6">
              소득세 감면을 신청할 수 있는 중소기업
            </h2>
            <p className="text-text/70 mb-8">
              근로자에게도 조건이 있는 것처럼 중소기업 중에서도 아래 요건에 해당하는
              사업체만 이 제도를 신청할 수 있어요.
            </p>
            <div className="space-y-4">
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-bold text-text mb-2">
                    1. 「중소기업기본법」 제2조에 따른 중소기업
                  </h3>
                  <p className="text-text/60 text-sm mb-3">
                    업종별로 중소기업으로 인정받는 규모 기준이 달라요.
                  </p>
                  <a
                    href="https://sminfo.mss.go.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    중소기업 확인 바로가기 →
                  </a>
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-bold text-text mb-2">
                    2. 「조세특례제한법 시행령」 제27조에 규정된 감면대상 업종
                  </h3>
                  <p className="text-text/60 text-sm mb-3">
                    중소기업 요건을 충족하더라도 특정 업종은 혜택이 제한돼요.
                  </p>
                  <a
                    href="https://www.law.go.kr/법령/조세특례제한법시행령/(20240101,33916,20231219),/제27조"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    법령 확인 바로가기 →
                  </a>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 혜택 상세 */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-6">
              매년 200만 원까지 혜택이 적용돼요
            </h2>
            <div className="prose prose-lg max-w-none text-text/70">
              <p>
                혜택 조건을 충족하는 청년이라면 <strong>5년간 소득세의 90%</strong>를,
                고령자·장애인·경력보유여성은 <strong>3년간 소득세의 70%</strong>를 연
                200만 원 한도 내에서 감면받을 수 있어요.
              </p>
              <p>
                혜택을 받으면 실제로 받는 월급은 그대로지만, 세금을 덜 내니까 실수령액이
                더 많아지는 효과가 생겨요. 실제로 이 제도를 통한 신청자들의{" "}
                <strong>평균 순세액감면액은 약 48만 원</strong>이라고 해요.
              </p>
            </div>

            <Card className="rounded-2xl mt-8 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-blue-900 mb-3">
                  이직/재취업해도 혜택 유지!
                </h3>
                <p className="text-blue-800 text-sm">
                  다른 중소기업으로 이직하거나, 잠시 그만둔 뒤 같은 회사에 재취업한
                  경우에도 혜택은 적용돼요. 감면 기간은 <strong>최초로 소득세 감면을
                  신청한 회사의 취업일</strong>로부터 계산됩니다.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 신청 방법 */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-6">
              신청은 어렵지 않아요
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">재직 중인 근로자</CardTitle>
                  <CardDescription>회사를 통해 신청</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    <p className="text-text/70 text-sm">
                      <strong>중소기업 취업자 소득세 감면 신청서</strong>를 작성해 회사에
                      제출
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    <p className="text-text/70 text-sm">
                      회사 담당자가 <strong>감면 대상 명세서</strong>를 작성해 세무서
                      제출
                    </p>
                  </div>
                  <div className="mt-4 p-3 bg-surface rounded-lg">
                    <p className="text-xs text-text/50">
                      ⏰ 제출 기한: 취업일 기준 <strong>다음 달 말일까지</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">퇴직한 근로자</CardTitle>
                  <CardDescription>직접 세무서에 신청</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    <p className="text-text/70 text-sm">
                      <strong>중소기업 취업자 소득세 감면 신청서</strong> 작성
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    <p className="text-text/70 text-sm">
                      주소지 관할 세무서에 직접 제출
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 경정청구 안내 */}
          <section>
            <Card className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-emerald-900 mb-4">
                  지금 신청해도 늦지 않아요
                </h2>
                <p className="text-emerald-800 mb-4">
                  &apos;입사한 지 이미 2년이 넘었는데… 이제 신청하는 건 늦은걸까?&apos;
                  하는 걱정은 내려놓으셔도 돼요. 혜택을 받을 수 있었는데도 아직 신청하지
                  않아 더 낸 세금이 있다면, <strong>경정청구</strong>를 통해 지금이라도
                  돌려받을 수 있어요.
                </p>
                <p className="text-emerald-700 text-sm">
                  ※ 경정청구: 잘못 낸 세금을 바로잡아 다시 신고하는 제도
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 양식 다운로드 */}
          <section>
            <h2 className="text-2xl font-bold text-text mb-6">양식 다운로드</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-text mb-1">
                        중소기업 취업자 소득세 감면 신청서
                      </h3>
                      <p className="text-sm text-text/50 mb-4">
                        근로자가 작성하여 회사에 제출하는 서류
                      </p>
                      <a
                        href="/downloads/중소기업_취업자_소득세_감면_신청서.hwp"
                        download
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        HWP 다운로드
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl opacity-60">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-text mb-1">
                        중소기업 취업자 소득세 감면 대상 명세서
                      </h3>
                      <p className="text-sm text-text/50 mb-4">
                        회사가 작성하여 세무서/홈택스에 제출하는 서류
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm text-text/40">
                        준비 중
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section>
            <Card className="rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-700">
              <CardContent className="p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  나의 감면 기간을 계산해보세요
                </h2>
                <p className="text-white/70 mb-8">
                  생년월일, 취업일, 병역기간을 입력하면 감면 기간과 혜택을 확인할 수
                  있어요.
                </p>
                <Link href="/sme-tax-reduction/calculator">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full px-8 bg-white text-blue-600 hover:bg-white/90"
                  >
                    감면 기간 계산하기
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>

          {/* 참고 안내 */}
          <section>
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-text/40 uppercase tracking-wider mb-4">
                  참고 법령
                </h3>
                <ul className="space-y-2 text-sm text-text/60">
                  <li>• 조세특례제한법 제30조 (중소기업 취업자에 대한 소득세 감면)</li>
                  <li>• 조세특례제한법 시행령 제27조</li>
                  <li>• 조세특례제한법 시행규칙 별지 제11호서식</li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </Container>
    </>
  );
}
