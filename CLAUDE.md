# Claude Code 프로젝트 규칙

## 패키지 매니저

- **yarn** 사용 (npm 대신 yarn 명령어 사용)
- 예시: `yarn install`, `yarn add`, `yarn dev`

## Git 커밋 컨벤션

### 커밋 메시지 형식
```
<type>: <subject>

<body>
```

### Type 종류
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `refactor`: 코드 리팩토링
- `perf`: 성능 개선
- `test`: 테스트 추가/수정
- `chore`: 빌드, 패키지 매니저 설정 등
- `ci`: CI/CD 설정 변경
- `revert`: 이전 커밋 되돌리기

### 규칙
- subject는 **한글**로 작성
- subject는 50자 이내로 간결하게
- subject 끝에 마침표(.) 금지
- body는 선택사항, 필요시 상세 내용 작성
- body는 한글로 작성

### 예시
```
feat: 연봉 계산기 페이지 추가

- 4대보험 계산 로직 구현
- 실수령액 결과 표시 컴포넌트 추가
```

```
fix: 입력 필드 휠 스크롤 문제 해결
```

```
refactor: 공통 헤더/푸터 컴포넌트 분리
```

```
chore: Framer Motion 패키지 추가
```
