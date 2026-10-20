<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 프로젝트 확인

- `garu-ko`와 두 검색 통합 패키지는 npm 릴리스 후 함께 갱신한다. 설치된 버전과 `app/layout.tsx`의 구조화 데이터·릴리스 링크를 맞춘다.
- 문장·공백 기능은 `components/BoundaryTab.tsx`에서 별도 API를 호출한다. `ResultTabs`가 탭을 열 때 로드하며 기본 형태소 분석에 공백 복원을 자동 적용하지 않는다.
- 배포 전 `npm run lint`, `npm run build`, `npm run test:seo`를 실행하고 브라우저에서 분석·문장 분리·공백 복원·두 검색 데모를 확인한다.
- Vercel 프로젝트 `garu-web`에 연결된 `main` 푸시가 배포를 시작한다. GitHub deployment 상태와 `https://garu.zerry.co.kr`의 실제 버전을 확인한다.
