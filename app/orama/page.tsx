'use client';

import PageNav from '@/components/PageNav';
import Footer from '@/components/Footer';
import SearchDemo from '@/components/search/SearchDemo';
import CodeSnippet from '@/components/search/CodeSnippet';
import { OramaDefaultAdapter } from '@/components/search/adapters/oramaDefault';
import { OramaGaruAdapter } from '@/components/search/adapters/oramaGaru';
import { SAMPLE_DOCS } from '@/lib/search/sampleDocs';
import { ORAMA_CHIPS } from '@/lib/search/suggestionChips';
import { ORAMA_SNIPPET } from '@/lib/search/snippets';

export default function OramaPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-12">
      <PageNav />
      <SearchDemo
        engineLabel="Orama"
        subtitle="기본 토크나이저 vs garu-orama-tokenizer"
        makeLeft={() => new OramaDefaultAdapter()}
        makeRight={() => new OramaGaruAdapter()}
        chips={ORAMA_CHIPS}
        docs={SAMPLE_DOCS}
      />
      <div className="mt-12">
        <CodeSnippet install={ORAMA_SNIPPET.install} code={ORAMA_SNIPPET.code} />
      </div>
      <Footer />
    </main>
  );
}
