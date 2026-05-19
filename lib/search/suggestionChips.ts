export interface ChipSet {
  label: string;
  hint: string;
}

const SHARED_CHIPS: ChipSet[] = [
  { label: '먹다', hint: '활용형 매치' },
  { label: '학교', hint: '조사 변형 매치' },
  { label: '좋다', hint: '형용사 활용 매치' },
  { label: 'AI', hint: '외래어 처리' },
  { label: '한국어', hint: '정상 매치' },
];

export const MINISEARCH_CHIPS = SHARED_CHIPS;
export const ORAMA_CHIPS = SHARED_CHIPS;
