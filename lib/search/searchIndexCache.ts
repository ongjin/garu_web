import type { SearchAdapter } from '@/components/search/adapters/types';

let miniSearchDefaultPromise: Promise<SearchAdapter> | null = null;
let miniSearchGaruPromise: Promise<SearchAdapter> | null = null;
let oramaDefaultPromise: Promise<SearchAdapter> | null = null;
let oramaGaruPromise: Promise<SearchAdapter> | null = null;

async function initAdapter(adapter: SearchAdapter): Promise<SearchAdapter> {
  const { SAMPLE_DOCS } = await import('@/lib/search/sampleDocs');
  await adapter.init(SAMPLE_DOCS);
  return adapter;
}

export function getMiniSearchDefaultAdapter(): Promise<SearchAdapter> {
  miniSearchDefaultPromise ??= import('@/components/search/adapters/miniSearchDefault').then(
    ({ MiniSearchDefaultAdapter }) => initAdapter(new MiniSearchDefaultAdapter()),
  );
  return miniSearchDefaultPromise;
}

export function getMiniSearchGaruAdapter(): Promise<SearchAdapter> {
  miniSearchGaruPromise ??= import('@/components/search/adapters/miniSearchGaru').then(
    ({ MiniSearchGaruAdapter }) => initAdapter(new MiniSearchGaruAdapter()),
  );
  return miniSearchGaruPromise;
}

export function getOramaDefaultAdapter(): Promise<SearchAdapter> {
  oramaDefaultPromise ??= import('@/components/search/adapters/oramaDefault').then(
    ({ OramaDefaultAdapter }) => initAdapter(new OramaDefaultAdapter()),
  );
  return oramaDefaultPromise;
}

export function getOramaGaruAdapter(): Promise<SearchAdapter> {
  oramaGaruPromise ??= import('@/components/search/adapters/oramaGaru').then(
    ({ OramaGaruAdapter }) => initAdapter(new OramaGaruAdapter()),
  );
  return oramaGaruPromise;
}

export function preloadSearchIndexes(): void {
  void getMiniSearchDefaultAdapter();
  void getMiniSearchGaruAdapter();
  void getOramaDefaultAdapter();
  void getOramaGaruAdapter();
}
