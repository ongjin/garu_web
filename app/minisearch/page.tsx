import PageNav from '@/components/PageNav';
import Footer from '@/components/Footer';
import CodeSnippet from '@/components/search/CodeSnippet';
import MiniSearchDemo from '@/components/search/MiniSearchDemo';
import SearchPageHeader from '@/components/search/SearchPageHeader';
import { MINISEARCH_SNIPPET } from '@/lib/search/snippets';

export default function MiniSearchPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-12">
      <PageNav />
      <div className="space-y-6">
        <SearchPageHeader
          engineLabel="MiniSearch"
          subtitle="기본 토크나이저 vs garu-minisearch-tokenizer"
        />
        <MiniSearchDemo />
      </div>
      <div className="mt-12">
        <CodeSnippet install={MINISEARCH_SNIPPET.install} code={MINISEARCH_SNIPPET.code} />
      </div>
      <Footer />
    </main>
  );
}
