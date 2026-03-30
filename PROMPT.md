# Garu Demo Website 구현 프롬프트

아래 구현 계획을 따라 Garu 데모 웹사이트를 구현해줘.

## 디자인 스펙
`docs/2026-03-30-demo-site-design.md`

## 구현 계획
`docs/2026-03-30-demo-site-plan.md`

## 실행 방식
- superpowers:subagent-driven-development 스킬을 사용해서 태스크별 서브에이전트로 구현
- 구현 계획의 Task 1 ~ Task 8을 순서대로 진행
- 각 태스크 완료 후 리뷰 → 다음 태스크 진행

## 주의사항
- garu-ko npm 패키지는 WASM을 포함하고 있어서 Next.js webpack 설정에 `asyncWebAssembly: true` 필요
- `output: 'export'`로 정적 빌드 (Vercel 정적 배포)
- 모든 분석은 100% 클라이언트 사이드 (서버 컴포넌트/API 없음)
- `'use client'` 디렉티브 필수
- garu-ko는 `dynamic import`로 브라우저에서만 로드
- 커밋 메시지에 AI/Claude 관련 내용 포함 금지
