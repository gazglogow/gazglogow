import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Production sitemap routes allow indexing and expose valid structured data', async () => {
  const root = 'output/seo-production';
  const sitemap = await readFile(`${root}/sitemap.xml`, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]));
  assert.equal(urls.length, 8);
  const descriptions = new Set();
  for (const url of urls) {
    assert.equal(url.origin, 'https://gazglogow.pl');
    const html = await readFile(`${root}${url.pathname}index.html`, 'utf8');
    assert.match(html, /name="robots" content="index, follow, max-image-preview:large"/);
    assert.ok(html.includes(`rel="canonical" href="${url.href}"`));
    descriptions.add(html.match(/name="description" content="([^"]+)"/)?.[1]);
    const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(match => JSON.parse(match[1]));
    assert.ok(schemas.some(schema => schema['@type'] === 'WebSite'));
    if (url.pathname.startsWith('/uslugi/')) {
      assert.ok(schemas.some(schema => schema['@type'] === 'Service' && schema.url === url.href));
      assert.ok(schemas.some(schema => schema['@type'] === 'BreadcrumbList'));
    }
  }
  assert.equal(descriptions.size, 8);
  assert.match(await readFile(`${root}/404.html`, 'utf8'), /name="robots" content="noindex, nofollow"/);
  const robots = await readFile(`${root}/robots.txt`, 'utf8');
  assert.match(robots, /Allow: \//);
  assert.doesNotMatch(robots, /Disallow/);
  assert.match(robots, /Sitemap: https:\/\/gazglogow.pl\/sitemap.xml/);
});
