import PageNav from '@/components/PageNav';
import Footer from '@/components/Footer';
import CodeSnippet from '@/components/search/CodeSnippet';
import OramaDemo from '@/components/search/OramaDemo';
import SearchPageHeader from '@/components/search/SearchPageHeader';
import { ORAMA_SNIPPET } from '@/lib/search/snippets';

export default function OramaPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-12">
      <PageNav />
      <div className="space-y-6">
        <SearchPageHeader
          engineLabel="Orama"
          subtitle="기본 토크나이저 vs garu-orama-tokenizer"
        />
        <OramaDemo />
      </div>
      <div className="mt-12">
        <CodeSnippet install={ORAMA_SNIPPET.install} code={ORAMA_SNIPPET.code} />
      </div>
      <Footer />
    </main>
  );
}
