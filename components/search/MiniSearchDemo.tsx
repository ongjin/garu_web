'use client';

import SearchDemo from './SearchDemo';
import { SAMPLE_DOCS } from '@/lib/search/sampleDocs';
import { MINISEARCH_CHIPS } from '@/lib/search/suggestionChips';
import {
  getMiniSearchDefaultAdapter,
  getMiniSearchGaruAdapter,
} from '@/lib/search/searchIndexCache';

export default function MiniSearchDemo() {
  return (
    <SearchDemo
      engineLabel="MiniSearch"
      subtitle="기본 토크나이저 vs garu-minisearch-tokenizer"
      makeLeft={getMiniSearchDefaultAdapter}
      makeRight={getMiniSearchGaruAdapter}
      chips={MINISEARCH_CHIPS}
      docs={SAMPLE_DOCS}
      showHeader={false}
    />
  );
}
