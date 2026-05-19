'use client';

import SearchDemo from './SearchDemo';
import { SAMPLE_DOCS } from '@/lib/search/sampleDocs';
import { ORAMA_CHIPS } from '@/lib/search/suggestionChips';
import { getOramaDefaultAdapter, getOramaGaruAdapter } from '@/lib/search/searchIndexCache';

export default function OramaDemo() {
  return (
    <SearchDemo
      engineLabel="Orama"
      subtitle="기본 토크나이저 vs garu-orama-tokenizer"
      makeLeft={getOramaDefaultAdapter}
      makeRight={getOramaGaruAdapter}
      chips={ORAMA_CHIPS}
      docs={SAMPLE_DOCS}
      showHeader={false}
    />
  );
}
