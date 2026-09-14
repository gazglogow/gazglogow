import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

async function walk(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(files.map(file => file.isDirectory() ? walk(join(dir, file.name)) : join(dir, file.name)))).flat();
}
const files = await walk('dist');
const pages = await Promise.all(files.filter(file => file.endsWith('.html')).map(async file => ({ file, html: await readFile(file, 'utf8') })));

test('Six HTML pages, distinct metadata and one main heading each', () => {
  assert.equal(pages.length, 6);
  const titles = new Set();
  for (const { html } of pages) {
    assert.match(html, /<html[^>]+lang="pl"/);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert.ok(title);
    titles.add(title);
    assert.match(html, /name="description"/);
    assert.match(html, /href="tel:\+48530366668"/);
    assert.doesNotMatch(html, /<form(?:\s|>)/);
  }
  assert.equal(titles.size, 6);
});

test('Local links, anchors and assets resolve in the built output', async () => {
  for (const { html, file } of pages) {
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const href = match[1];
      if (/^(https?:|tel:|data:)/.test(href)) continue;
      const [path, hash] = href.split('#');
      const target = path ? join('dist', path.endsWith('/') ? `${path}index.html` : path) : file;
      assert.ok((await stat(target)).isFile(), `${file}: ${href}`);
      if (hash) assert.ok((await readFile(target, 'utf8')).includes(`id="${hash}"`), `${file}: missing #${hash}`);
    }
  }
});

test('Preview stays out of indexing and sitemap contains only the five content routes', async () => {
  for (const { html } of pages) assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.match(await readFile('dist/robots.txt', 'utf8'), /Disallow: \//);
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 5);
  assert.doesNotMatch(sitemap, /404/);
});

test('Hero optimized assets fit the agreed lightweight delivery', async () => {
  assert.ok((await stat('dist/images/carbon-1600.avif')).size < 150_000);
  assert.ok(!files.some(file => file.includes('originals')));
});
