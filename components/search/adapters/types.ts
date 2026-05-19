import type { SampleDoc } from '@/lib/search/sampleDocs';

export type { SampleDoc };

export interface SearchHit {
  id: string;
  title: string;
  body: string;
  score?: number;
  matchedTerms: string[];
}

export interface SearchAdapter {
  name: string;
  ready: boolean;
  init(docs: SampleDoc[]): Promise<void>;
  search(query: string): SearchHit[] | Promise<SearchHit[]>;
}
