import type { Garu } from 'garu-ko';
import MiniSearch from 'minisearch';
import { createTokenizer } from 'garu-minisearch-tokenizer';
import type { SearchAdapter, SearchHit, SampleDoc } from './types';
import { loadGaru } from './garuShared';

export class MiniSearchGaruAdapter implements SearchAdapter {
  name = 'garu-minisearch-tokenizer';
  ready = false;
  private ms: MiniSearch | null = null;
  private tokenize: ((text: string) => string[]) | null = null;

  async init(docs: SampleDoc[]): Promise<void> {
    const garu = (await loadGaru()) as Garu;
    this.tokenize = await createTokenizer({ garu });
    this.ms = new MiniSearch({
      fields: ['title', 'body'],
      storeFields: ['title', 'body'],
      tokenize: this.tokenize,
      processTerm: (t) => t.toLowerCase(),
    });
    this.ms.addAll(docs);
    this.ready = true;
  }

  search(query: string): SearchHit[] {
    if (!this.ms || !query.trim()) return [];
    return this.ms.search(query).map((r) => ({
      id: String(r.id),
      title: r.title as string,
      body: r.body as string,
      matchedTerms: (r.terms as string[] | undefined) ?? [],
    }));
  }
}
