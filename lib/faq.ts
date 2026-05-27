export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: '한국어 형태소 분석기란 무엇인가요?',
    answer:
      '한국어 형태소 분석기는 문장을 의미를 가진 최소 단위인 형태소로 분리하고 각 형태소에 품사(POS) 태그를 부여하는 자연어 처리 도구입니다. 한국어는 교착어로 어근에 조사·어미가 결합하기 때문에 단순 공백 분리만으로는 토큰화할 수 없어, 검색·번역·텍스트 마이닝 등 모든 한국어 NLP 작업에 형태소 분석이 필수적으로 사용됩니다.',
  },
  {
    question: '가루(Garu)는 어떻게 브라우저에서 직접 동작하나요?',
    answer:
      '가루는 Rust로 작성된 형태소 분석 엔진을 WebAssembly(WASM)로 컴파일해 브라우저에서 실행합니다. 1.0MB의 brotli 압축 코드북 모델과 155KB(gzip) WASM 엔진을 처음 로드한 뒤에는 모든 분석이 사용자 디바이스에서 일어나므로 별도의 서버 통신이나 백엔드 인프라가 필요 없습니다.',
  },
  {
    question: '어떤 품사 태그 체계를 사용하나요?',
    answer:
      '국립국어원 세종 품사 태그셋(42종)을 그대로 사용합니다. 일반명사(NNG), 고유명사(NNP), 동사(VV), 형용사(VA), 조사(JKS/JKO/JKB 등), 어미(EP/EF/EC 등), 기호(SF/SP/SS 등)까지 한국어 형태소를 정밀하게 구분합니다.',
  },
  {
    question: '오프라인 환경에서도 동작하나요?',
    answer:
      '네. 초기 로드 시에만 모델과 WASM 엔진을 받아오고, 그 이후로는 네트워크 없이 동작합니다. 서비스 워커와 함께 쓰면 완전 오프라인 PWA, 브라우저 확장 프로그램, 사내 인트라넷 환경에서도 한국어 형태소 분석을 그대로 활용할 수 있습니다.',
  },
  {
    question: '정확도는 어느 정도인가요?',
    answer:
      '국립국어원 NIKL Modu Corpus 형태분석 말뭉치 기준 F1 93.7%, 9,000문장 v15k 골드 테스트셋 기준 F1 93.3%를 달성합니다. 코드북 + Trigram Viterbi + 어절 캐시 + 문맥 후처리 규칙을 조합해 1MB 크기 모델에서 데스크톱 분석기 수준에 근접한 정확도를 유지합니다.',
  },
  {
    question: 'Node.js 서버나 다른 런타임에서도 사용할 수 있나요?',
    answer:
      'npm install garu-ko 한 줄로 브라우저 ESM, Node.js, Bun, Deno 모두에서 동일한 API로 동작합니다. Next.js App Router의 클라이언트 컴포넌트, Vite/SvelteKit 프로젝트, Electron 앱, 서버사이드 형태소 분석까지 모두 같은 패키지를 씁니다.',
  },
  {
    question: '상업적으로 사용해도 되나요?',
    answer:
      '네. 가루(garu-ko)는 오픈소스로 공개되어 있으며 GitHub 저장소의 LICENSE 파일에 따라 상업적 이용이 허용됩니다. 사용 시 별도의 라이선스 비용은 발생하지 않습니다.',
  },
];
