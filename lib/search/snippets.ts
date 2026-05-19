export const MINISEARCH_SNIPPET = {
  install: 'npm i minisearch garu-minisearch-tokenizer',
  code: `import MiniSearch from 'minisearch'
import { createTokenizer } from 'garu-minisearch-tokenizer'

const tokenize = await createTokenizer()
const ms = new MiniSearch({
  fields: ['title', 'body'],
  tokenize,
})
ms.addAll(documents)
const results = ms.search('먹다')`,
};

export const ORAMA_SNIPPET = {
  install: 'npm i @orama/orama garu-orama-tokenizer',
  code: `import { create, insert, search } from '@orama/orama'
import { createTokenizer } from 'garu-orama-tokenizer'

const db = await create({
  schema: { title: 'string', body: 'string' },
  components: { tokenizer: await createTokenizer() },
})
for (const doc of documents) await insert(db, doc)
const res = await search(db, { term: '먹다' })`,
};
