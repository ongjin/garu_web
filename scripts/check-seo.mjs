import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../out/index.html', import.meta.url), 'utf8');

const expectedTitle =
  '한국어 형태소 분석기 가루(Garu) - 브라우저에서 바로 실행되는 WASM 분석기';

assert.match(
  html,
  new RegExp(`<title>${expectedTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</title>`),
  'home page title should lead with the target query',
);

assert.match(
  html,
  /<h1[^>]*>[\s\S]*한국어 형태소 분석기[\s\S]*가루[\s\S]*Garu[\s\S]*<\/h1>/,
  'home page h1 should make the target query the primary visible heading',
);

const jsonLdMatch = html.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
);
assert.ok(jsonLdMatch, 'home page should render JSON-LD');
assert.doesNotMatch(
  jsonLdMatch[1],
  /</,
  'JSON-LD should escape < characters before being injected',
);

const jsonLd = JSON.parse(jsonLdMatch[1]);
assert.equal(jsonLd['@context'], 'https://schema.org');
assert.ok(Array.isArray(jsonLd['@graph']), 'JSON-LD should use an @graph');

const graph = new Map(jsonLd['@graph'].map((node) => [node['@id'], node]));
const website = graph.get('https://garu.zerry.co.kr/#website');
const software = graph.get('https://garu.zerry.co.kr/#software');
const author = graph.get('https://zerry.co.kr/#person');

assert.ok(website, 'JSON-LD should include a WebSite node');
assert.equal(website['@type'], 'WebSite');
assert.equal(website.name, '가루(Garu)');
assert.deepEqual(website.alternateName, [
  'garu-ko',
  '한국어 형태소 분석기 가루',
]);
assert.equal(website.url, 'https://garu.zerry.co.kr');

assert.ok(author, 'JSON-LD should include a Person node');
assert.equal(author['@type'], 'Person');
assert.equal(author.name, 'Yongjin Cho');
assert.ok(author.sameAs?.includes('https://github.com/ongjin'));

assert.ok(software, 'JSON-LD should include a SoftwareApplication node');
assert.deepEqual(software['@type'], ['SoftwareApplication', 'WebApplication']);
assert.equal(software.softwareVersion, '0.9.7');
assert.equal(
  software.name,
  '한국어 형태소 분석기 가루(Garu)',
  'structured data name should align with the target query',
);
assert.equal(software.publisher['@id'], 'https://zerry.co.kr/#person');
assert.equal(software.author['@id'], 'https://zerry.co.kr/#person');
assert.equal(software.offers.price, 0);
assert.equal(software.offers.priceCurrency, 'USD');
assert.equal(software.license, 'https://github.com/ongjin/garu/blob/main/LICENSE');
assert.equal(software.releaseNotes, 'https://github.com/ongjin/garu/releases/tag/v0.9.7');
assert.equal(software.softwareHelp, 'https://github.com/ongjin/garu#readme');
assert.equal(software.bugReport, 'https://github.com/ongjin/garu/issues');
assert.deepEqual(software.featureList, [
  '한국어 형태소 분석',
  '세종 품사 태깅',
  '명사 추출',
  '한국어 토큰화',
  '브라우저 WASM 실행',
]);

for (const url of [
  'https://github.com/ongjin/garu',
  'https://www.npmjs.com/package/garu-ko',
  'https://news.hada.io/topic?id=28002',
]) {
  assert.ok(software.sameAs?.includes(url), `sameAs should include ${url}`);
}

assert.equal(software.mainEntityOfPage['@id'], 'https://garu.zerry.co.kr/#website');

assert.match(
  html,
  /<meta property="og:site_name" content="가루\(Garu\)"\/>/,
  'Open Graph site name should use the concise brand name',
);
