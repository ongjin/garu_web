export type PosCategory = 'noun' | 'verb' | 'particle' | 'ending' | 'adverb' | 'affix' | 'symbol';

export interface PosInfo {
  label: string;
  description: string;
  category: PosCategory;
}

export const POS_COLORS: Record<PosCategory, { bg: string; fg: string }> = {
  noun:     { bg: 'var(--pos-noun-bg)',     fg: 'var(--pos-noun-fg)' },
  verb:     { bg: 'var(--pos-verb-bg)',     fg: 'var(--pos-verb-fg)' },
  particle: { bg: 'var(--pos-particle-bg)', fg: 'var(--pos-particle-fg)' },
  ending:   { bg: 'var(--pos-ending-bg)',   fg: 'var(--pos-ending-fg)' },
  adverb:   { bg: 'var(--pos-adverb-bg)',   fg: 'var(--pos-adverb-fg)' },
  affix:    { bg: 'var(--pos-affix-bg)',    fg: 'var(--pos-affix-fg)' },
  symbol:   { bg: 'var(--pos-symbol-bg)',   fg: 'var(--pos-symbol-fg)' },
};

export const POS_MAP: Record<string, PosInfo> = {
  NNG: { label: 'NNG', description: '일반명사', category: 'noun' },
  NNP: { label: 'NNP', description: '고유명사', category: 'noun' },
  NNB: { label: 'NNB', description: '의존명사', category: 'noun' },
  NR:  { label: 'NR',  description: '수사', category: 'noun' },
  NP:  { label: 'NP',  description: '대명사', category: 'noun' },
  VV:  { label: 'VV',  description: '동사', category: 'verb' },
  VA:  { label: 'VA',  description: '형용사', category: 'verb' },
  VX:  { label: 'VX',  description: '보조용언', category: 'verb' },
  VCP: { label: 'VCP', description: '긍정지정사', category: 'verb' },
  VCN: { label: 'VCN', description: '부정지정사', category: 'verb' },
  MAG: { label: 'MAG', description: '일반부사', category: 'adverb' },
  MAJ: { label: 'MAJ', description: '접속부사', category: 'adverb' },
  MM:  { label: 'MM',  description: '관형사', category: 'adverb' },
  IC:  { label: 'IC',  description: '감탄사', category: 'adverb' },
  JKS: { label: 'JKS', description: '주격조사', category: 'particle' },
  JKC: { label: 'JKC', description: '보격조사', category: 'particle' },
  JKG: { label: 'JKG', description: '관형격조사', category: 'particle' },
  JKO: { label: 'JKO', description: '목적격조사', category: 'particle' },
  JKB: { label: 'JKB', description: '부사격조사', category: 'particle' },
  JKV: { label: 'JKV', description: '호격조사', category: 'particle' },
  JKQ: { label: 'JKQ', description: '인용격조사', category: 'particle' },
  JX:  { label: 'JX',  description: '보조사', category: 'particle' },
  JC:  { label: 'JC',  description: '접속조사', category: 'particle' },
  EP:  { label: 'EP',  description: '선어말어미', category: 'ending' },
  EF:  { label: 'EF',  description: '종결어미', category: 'ending' },
  EC:  { label: 'EC',  description: '연결어미', category: 'ending' },
  ETN: { label: 'ETN', description: '명사형전성어미', category: 'ending' },
  ETM: { label: 'ETM', description: '관형형전성어미', category: 'ending' },
  XPN: { label: 'XPN', description: '접두사', category: 'affix' },
  XSN: { label: 'XSN', description: '명사파생접미사', category: 'affix' },
  XSV: { label: 'XSV', description: '동사파생접미사', category: 'affix' },
  XSA: { label: 'XSA', description: '형용사파생접미사', category: 'affix' },
  XR:  { label: 'XR',  description: '어근', category: 'affix' },
  SF:  { label: 'SF',  description: '마침표/물음표/느낌표', category: 'symbol' },
  SP:  { label: 'SP',  description: '쉼표/가운뎃점/콜론/빗금', category: 'symbol' },
  SS:  { label: 'SS',  description: '따옴표/괄호표', category: 'symbol' },
  SE:  { label: 'SE',  description: '줄임표', category: 'symbol' },
  SO:  { label: 'SO',  description: '붙임표', category: 'symbol' },
  SW:  { label: 'SW',  description: '기타기호', category: 'symbol' },
  SH:  { label: 'SH',  description: '한자', category: 'symbol' },
  SL:  { label: 'SL',  description: '외국어', category: 'symbol' },
  SN:  { label: 'SN',  description: '숫자', category: 'symbol' },
};

export function getPosInfo(pos: string): PosInfo {
  return POS_MAP[pos] ?? { label: pos, description: pos, category: 'symbol' };
}

export function getPosColor(pos: string): { bg: string; fg: string } {
  const info = getPosInfo(pos);
  return POS_COLORS[info.category];
}
