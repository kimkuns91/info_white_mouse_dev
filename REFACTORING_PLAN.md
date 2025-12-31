# InfoMouse 프로젝트 리팩토링 계획서

## 현재 상태 분석

### 프로젝트 구조
```
src/
├── app/
│   ├── layout.tsx      # 기본 메타데이터만 존재
│   ├── page.tsx        # 메인 페이지 (헤더/푸터 중복)
│   ├── salary/
│   │   └── page.tsx    # 연봉 계산기 (헤더/푸터 중복)
│   └── globals.css
├── components/
│   ├── ui/             # shadcn 컴포넌트
│   └── salary/         # 연봉 계산기 전용 컴포넌트
├── constants/
├── services/
├── types/
└── utils/
```

### 발견된 문제점

1. **코드 중복**: Header, Footer가 각 페이지에 중복
2. **SEO 부재**: 동적 메타데이터, Open Graph, JSON-LD 구조화 데이터 없음
3. **에러 처리 부재**: not-found, error 페이지 없음
4. **아이콘 관리**: SVG 아이콘이 인라인으로 산재
5. **상수 관리**: 사이트 정보가 하드코딩됨
6. **접근성**: aria 속성 부족
7. **성능 최적화**: 이미지 최적화, 코드 스플리팅 미적용

---

## 리팩토링 태스크

### Phase 1: 기반 구조 정비 (우선순위: 높음) ✅ 완료

#### 1.1 사이트 설정 및 상수 중앙화
- [x] `src/config/site.ts` 생성 - 사이트 메타정보 통합
- [x] `src/config/navigation.ts` 생성 - 네비게이션 메뉴 관리
- [x] `src/config/tools.ts` 생성 - 도구 목록 데이터 분리

#### 1.2 공통 레이아웃 컴포넌트
- [x] `src/components/layout/Header.tsx` - 공통 헤더
- [x] `src/components/layout/Footer.tsx` - 공통 푸터
- [x] `src/components/layout/Container.tsx` - 페이지 컨테이너
- [x] `src/components/layout/PageHeader.tsx` - 페이지별 히어로 섹션

#### 1.3 아이콘 시스템
- [x] `src/components/icons/index.tsx` - 공통 아이콘 컴포넌트
- [x] Logo, Search, Menu 등 재사용 아이콘 분리

---

### Phase 2: SEO 최적화 (우선순위: 매우 높음) ✅ 완료

#### 2.1 메타데이터 시스템
- [x] `src/lib/metadata.ts` - 메타데이터 생성 유틸리티
- [x] 루트 레이아웃에 기본 메타데이터 강화
- [x] 각 페이지별 동적 메타데이터 적용

#### 2.2 Open Graph & Twitter Cards
- [ ] OG 이미지 생성 (`app/opengraph-image.tsx`)
- [ ] 동적 OG 이미지 (연봉 계산 결과 공유용)
- [x] Twitter Card 메타데이터

#### 2.3 구조화 데이터 (JSON-LD)
- [x] `src/components/seo/JsonLd.tsx` - JSON-LD 컴포넌트
- [x] Organization 스키마
- [x] WebApplication 스키마 (계산기 도구)
- [x] BreadcrumbList 스키마
- [x] FAQPage 스키마 (자주 묻는 질문 추가 시)

#### 2.4 기술적 SEO
- [x] `app/sitemap.ts` - 동적 사이트맵
- [x] `app/robots.ts` - robots.txt
- [x] Canonical URL 설정
- [ ] 다국어 지원 준비 (hreflang)

---

### Phase 3: 에러 및 상태 페이지 ✅ 완료

#### 3.1 에러 페이지
- [x] `app/not-found.tsx` - 404 페이지
- [x] `app/error.tsx` - 에러 바운더리
- [ ] `app/global-error.tsx` - 전역 에러

#### 3.2 로딩 상태
- [x] `app/loading.tsx` - 전역 로딩
- [x] `app/salary/loading.tsx` - 연봉 계산기 로딩
- [ ] Skeleton 컴포넌트 추가

---

### Phase 4: 컴포넌트 고도화

#### 4.1 UI 컴포넌트 확장
- [ ] `src/components/ui/skeleton.tsx` - 스켈레톤 로딩
- [ ] `src/components/ui/badge.tsx` - 배지 (Coming Soon 등)
- [ ] `src/components/ui/tooltip.tsx` - 툴팁

#### 4.2 공통 컴포넌트
- [ ] `src/components/common/ToolCard.tsx` - 도구 카드
- [ ] `src/components/common/InfoCard.tsx` - 정보 카드
- [ ] `src/components/common/AnimatedNumber.tsx` - 숫자 애니메이션 분리

---

### Phase 5: 성능 및 접근성

#### 5.1 성능 최적화
- [ ] Next.js Image 컴포넌트 활용
- [x] 폰트 최적화 (next/font 활용 중)
- [ ] 번들 분석 및 최적화

#### 5.2 접근성 (a11y)
- [x] aria-label 추가 (Header 컴포넌트)
- [ ] 키보드 네비게이션 개선
- [ ] 색상 대비 검토
- [ ] skip-to-content 링크

---

## 구현 순서

```
1. Phase 1.1 → 설정 파일 생성 ✅
2. Phase 2.1-2.4 → SEO 기반 작업 (가장 중요) ✅
3. Phase 1.2-1.3 → 공통 컴포넌트 ✅
4. Phase 3 → 에러 페이지 ✅
5. Phase 4 → UI 컴포넌트
6. Phase 5 → 성능/접근성
```

---

## 예상 파일 구조 (리팩토링 후)

```
src/
├── app/
│   ├── layout.tsx              # 강화된 루트 레이아웃 ✅
│   ├── page.tsx                # 간소화된 메인 페이지 ✅
│   ├── not-found.tsx           # 404 페이지 ✅
│   ├── error.tsx               # 에러 페이지 ✅
│   ├── loading.tsx             # 로딩 페이지 ✅
│   ├── sitemap.ts              # 동적 사이트맵 ✅
│   ├── robots.ts               # robots.txt ✅
│   ├── opengraph-image.tsx     # OG 이미지
│   ├── salary/
│   │   ├── page.tsx            # ✅
│   │   ├── loading.tsx         # ✅
│   │   └── opengraph-image.tsx # 동적 OG 이미지
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # ✅
│   │   ├── Footer.tsx          # ✅
│   │   ├── Container.tsx       # ✅
│   │   └── PageHeader.tsx      # ✅
│   ├── common/
│   │   ├── ToolCard.tsx
│   │   ├── InfoCard.tsx
│   │   └── AnimatedNumber.tsx
│   ├── icons/
│   │   └── index.tsx           # ✅
│   ├── seo/
│   │   └── JsonLd.tsx          # ✅
│   ├── ui/                     # shadcn 컴포넌트
│   └── salary/                 # 도메인 컴포넌트
├── config/
│   ├── site.ts                 # ✅
│   ├── navigation.ts           # ✅
│   └── tools.ts                # ✅
├── lib/
│   ├── utils.ts
│   └── metadata.ts             # ✅
├── constants/
├── services/
├── types/
└── utils/
```

---

## 메모

- 각 태스크 완료 시 이 문서의 체크박스를 업데이트
- 빌드 테스트는 각 Phase 완료 후 수행
- SEO는 비즈니스 임팩트가 가장 크므로 우선 처리

## 완료된 리팩토링 (2024-12-31)

### 1차 리팩토링 완료 항목:
1. **설정 파일 중앙화**: site.ts, navigation.ts, tools.ts 생성
2. **SEO 최적화**:
   - 메타데이터 유틸리티 (generatePageMetadata, generateToolMetadata)
   - JSON-LD 구조화 데이터 (Organization, WebSite, WebApplication, Breadcrumb, FAQ)
   - sitemap.xml, robots.txt 자동 생성
   - Twitter Card 및 Open Graph 메타데이터
3. **공통 레이아웃**: Header, Footer, Container, PageHeader 컴포넌트
4. **아이콘 시스템**: 재사용 가능한 아이콘 컴포넌트
5. **에러 페이지**: not-found, error, loading 페이지
6. **페이지 리팩토링**: 메인 페이지와 연봉 계산기 페이지 공통 컴포넌트 적용
