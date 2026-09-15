import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? htmlFiles(join(dir, entry.name)) : entry.name.endsWith('.html') ? [join(dir, entry.name)] : []))).flat();
}

for (const target of [
  { dir: 'dist', prefix: '/', origin: 'https://gazglogow.pl' },
  { dir: 'output/github-pages', prefix: '/gazglogow/', origin: 'https://gazglogow.github.io' },
]) {
  test(`All routes, images and metadata work at ${target.origin}${target.prefix}`, async () => {
    const pages = await htmlFiles(target.dir);
    assert.equal(pages.length, 6);
    for (const file of pages) {
      const html = await readFile(file, 'utf8');
      const hrefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
      const srcsets = [...html.matchAll(/srcset="([^"]+)"/g)].flatMap(m => m[1].split(',').map(item => item.trim().split(/\s+/)[0]));
      for (const url of [...hrefs, ...srcsets]) {
        if (!url.startsWith('/')) continue;
        assert.ok(url.startsWith(target.prefix), `${file}: ${url} ignores base`);
        const [relative, anchor] = url.slice(target.prefix.length).split('#');
        const path = join(target.dir, !relative || relative.endsWith('/') ? `${relative}index.html` : relative);
        assert.ok((await stat(path)).isFile(), `${file}: missing ${url}`);
        if (anchor) assert.ok((await readFile(path, 'utf8')).includes(`id="${anchor}"`));
      }
      assert.ok(html.includes(`rel="canonical" href="${target.origin}${target.prefix}`), `Canonical ${file}`);
    }
    const sitemap = await readFile(join(target.dir, 'sitemap.xml'), 'utf8');
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    assert.equal(urls.length, 5);
    urls.forEach(url => assert.ok(url.startsWith(target.origin + target.prefix)));
  });
}
