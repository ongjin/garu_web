# 가루 웹 데모

[garu.zerry.co.kr](https://garu.zerry.co.kr)에서 형태소 분석·명사 추출·토큰화,
문장 분리·공백 복원과 Orama·MiniSearch 검색을 브라우저에서 실행합니다.
Next.js App Router를 정적 HTML로 내보내 Vercel에 배포합니다.

## 실행과 검증

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run test:seo
```

`npm run build`는 정적 결과를 `out/`에 생성합니다. 배포 전 브라우저에서
`/`, `/orama`, `/minisearch`, `/use-cases`를 확인합니다.

## 기능 연결

- `lib/garu/loadGaru.ts`는 형태소 분석기 인스턴스를 공유합니다.
- `components/BoundaryTab.tsx`는 `garu-ko/sentences`의 빠른 `splitSentences(text)`와
  `garu-ko/text`의 보수적인 `restoreSpacing(text)`를 사용합니다.
- 문장·공백 모듈은 해당 탭을 처음 열 때 불러옵니다. 원래 분석 결과에 복원문을
  자동으로 적용하지 않으며, 화면 위의 처리시간은 형태소 분석 시간입니다.
- 각 기능의 모듈을 로드한 뒤에는 네트워크 없이 계산합니다.

## 릴리스 동기화

본체와 검색 통합 패키지를 npm에 먼저 배포한 후 이 저장소의 의존성을 갱신합니다.
`app/layout.tsx`의 버전·릴리스 링크, 화면 수치, FAQ와 SEO 검사를 함께 맞춥니다.
모델 파일 크기와 실제 실행 중 메모리 사용량은 구분합니다.

검증 후 `main`에 푸시하고 Vercel의 Production deployment 상태 및 실제 사이트의
버전을 확인합니다. 패키지 코드·사전 데이터의 이용 조건은
[garu-ko LICENSE](https://github.com/ongjin/garu/blob/v0.11.0/js/LICENSE)와
[데이터 고지](https://github.com/ongjin/garu/blob/v0.11.0/js/models/NOTICE.md)를 따릅니다.
`public/licenses/`에는 설치한 세 패키지의 LICENSE·NOTICE와 Garu 사전 데이터 고지를
함께 보관하며, 패키지를 갱신할 때 해당 파일도 맞춥니다.
