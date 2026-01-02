# Prisma 7 + Neon Serverless 설정 가이드

이 문서는 Prisma 7과 Neon Serverless PostgreSQL을 연동하면서 겪은 문제와 해결 과정을 정리한 것입니다.

## 개요

- **Prisma 버전**: 7.2.0
- **Neon Adapter 버전**: @prisma/adapter-neon 7.2.0
- **목적**: 차량 추천 로그를 Neon PostgreSQL에 저장

---

## 1. 패키지 설치

```bash
yarn add prisma @prisma/client @neondatabase/serverless @prisma/adapter-neon ws
yarn add -D @types/ws
```

---

## 2. Prisma 초기화

```bash
npx prisma init
```

이 명령어로 생성되는 파일:
- `prisma/schema.prisma` - 스키마 정의
- `prisma.config.ts` - Prisma 7 설정 파일 (신규)
- `.env` - 환경변수 템플릿

---

## 3. Prisma 7의 주요 변경사항

### 3.1 schema.prisma에서 `url` 제거

**Prisma 6 이하:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")  // 이 방식은 Prisma 7에서 지원 안됨
}
```

**Prisma 7:**
```prisma
datasource db {
  provider = "postgresql"
  // url은 prisma.config.ts에서 설정
}
```

> Prisma 7에서는 `url` 속성을 schema 파일에 넣으면 에러 발생:
> "The datasource property `url` is no longer supported in schema files."

### 3.2 prisma.config.ts 설정

```typescript
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// .env.local 파일 우선 로드 (Next.js와 동일하게)
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

> **중요**: `dotenv/config` 대신 `{ config } from "dotenv"`를 사용하여 `.env.local` 경로를 명시적으로 지정해야 함.

### 3.3 driverAdapters 프리뷰 기능 제거

**Prisma 6:**
```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]  // 필요했음
}
```

**Prisma 7:**
```prisma
generator client {
  provider = "prisma-client-js"
  // driverAdapters는 이제 GA이므로 previewFeatures 불필요
}
```

---

## 4. Neon Adapter 설정 (핵심)

### 4.1 잘못된 설정 (에러 발생)

```typescript
// 오류: Pool을 직접 전달하면 타입 에러 발생
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);  // 타입 에러!
```

에러 메시지:
```
Type 'Pool' is not assignable to parameter of type 'PoolConfig'.
```

### 4.2 올바른 설정 (Prisma 7 방식)

```typescript
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

// WebSocket 설정 (Node.js 환경에서 필요)
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // Prisma 7 방식: connectionString을 객체로 전달
  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

> **핵심 변경점**: `new PrismaNeon(pool)` 대신 `new PrismaNeon({ connectionString })`

---

## 5. 환경변수 설정

### .env.local (권장)
```env
DATABASE_URL="postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require"
```

### .env (Prisma CLI용)
```env
DATABASE_URL="postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require"
```

> **참고**: Next.js는 `.env.local`을 우선 로드하지만, Prisma CLI는 `.env`만 읽음.
> `prisma.config.ts`에서 `.env.local`을 명시적으로 로드하거나 두 파일에 동일한 값을 설정.

---

## 6. 마이그레이션 실행

```bash
# Prisma 클라이언트 생성
npx prisma generate

# 마이그레이션 생성 및 적용
npx prisma migrate dev --name init
```

---

## 7. 발생했던 에러와 해결책

### 에러 1: "The datasource property `url` is no longer supported"
- **원인**: schema.prisma에 `url = env("DATABASE_URL")` 포함
- **해결**: schema에서 url 제거, prisma.config.ts에서 설정

### 에러 2: "Type 'Pool' is not assignable to parameter of type 'PoolConfig'"
- **원인**: Prisma 7에서 Neon adapter API 변경됨
- **해결**: `new PrismaNeon({ connectionString })` 형태로 변경

### 에러 3: "No database host or connection string was set"
- **원인**: 런타임에 환경변수가 로드되지 않음
- **해결**:
  1. `.env.local`과 `.env` 모두에 DATABASE_URL 설정
  2. 개발 서버 재시작
  3. `.next` 폴더 삭제 후 재빌드

### 에러 4: WebSocket 연결 실패
- **원인**: Node.js 환경에서 WebSocket 생성자 미설정
- **해결**: `neonConfig.webSocketConstructor = ws` 추가

---

## 8. 최종 파일 구조

```
prisma/
├── schema.prisma        # 모델 정의 (url 없음)
├── migrations/          # 마이그레이션 파일들
└── prisma.config.ts     # Prisma 7 설정

src/lib/db/
└── index.ts             # PrismaClient with Neon adapter

.env.local               # 실제 환경변수 (Git 제외)
.env                     # Prisma CLI용 환경변수
```

---

## 9. 참고 링크

- [Prisma 7 Upgrade Guide](https://www.prisma.io/docs/ai/prompts/prisma-7)
- [Neon + Prisma 연동 가이드](https://neon.com/docs/guides/prisma)
- [Prisma Neon Adapter](https://www.prisma.io/docs/orm/overview/databases/neon)

---

## 10. 체크리스트

- [ ] `prisma` 및 `@prisma/client` 7.x 설치
- [ ] `@prisma/adapter-neon`, `@neondatabase/serverless`, `ws` 설치
- [ ] `schema.prisma`에서 `url` 속성 제거
- [ ] `prisma.config.ts`에 datasource url 설정
- [ ] `src/lib/db/index.ts`에서 `new PrismaNeon({ connectionString })` 사용
- [ ] `.env.local`과 `.env`에 DATABASE_URL 설정
- [ ] `npx prisma generate` 실행
- [ ] `npx prisma migrate dev` 실행
