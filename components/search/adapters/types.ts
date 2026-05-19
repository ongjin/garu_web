import type { SampleDoc } from '@/lib/search/sampleDocs';
import type { SearchMatchedRanges } from '@/lib/search/highlight';

export type { SampleDoc };

export interface SearchHit {
  id: string;
  title: string;
  body: string;
  score?: number;
  matchedTerms: string[];
  matchedRanges?: SearchMatchedRanges;
}

export interface SearchAdapter {
  name: string;
  ready: boolean;
  init(docs: SampleDoc[]): Promise<void>;
  search(query: string): SearchHit[] | Promise<SearchHit[]>;
}

export type SearchAdapterFactory = () => SearchAdapter | Promise<SearchAdapter>;
