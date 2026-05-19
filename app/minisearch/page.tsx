'use client';

import PageNav from '@/components/PageNav';
import Footer from '@/components/Footer';
import SearchDemo from '@/components/search/SearchDemo';
import CodeSnippet from '@/components/search/CodeSnippet';
import { MiniSearchDefaultAdapter } from '@/components/search/adapters/miniSearchDefault';
import { MiniSearchGaruAdapter } from '@/components/search/adapters/miniSearchGaru';
import { SAMPLE_DOCS } from '@/lib/search/sampleDocs';
import { MINISEARCH_CHIPS } from '@/lib/search/suggestionChips';
import { MINISEARCH_SNIPPET } from '@/lib/search/snippets';

export default function MiniSearchPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-12">
      <PageNav />
      <SearchDemo
        engineLabel="MiniSearch"
        subtitle="기본 토크나이저 vs garu-minisearch-tokenizer"
        makeLeft={() => new MiniSearchDefaultAdapter()}
        makeRight={() => new MiniSearchGaruAdapter()}
        chips={MINISEARCH_CHIPS}
        docs={SAMPLE_DOCS}
      />
      <div className="mt-12">
        <CodeSnippet install={MINISEARCH_SNIPPET.install} code={MINISEARCH_SNIPPET.code} />
      </div>
      <Footer />
    </main>
  );
}
