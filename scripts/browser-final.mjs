import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { writeFile, readFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = [];
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
assert.equal(routes.length, 8, 'Sitemap must contain eight content routes; never skip an empty route list');
try {
  for (const width of [390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', hasTouch: width < 1000 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('requestfailed', request => errors.push(request.url()));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    for (const route of routes) {
      await page.goto(`http://localhost:4322${route}`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, `Overflow ${route} ${width}`);
      assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length), 0, 'Reduced motion');
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      if (result.violations.length) console.log(JSON.stringify(result.violations.map(v => ({ id: v.id, nodes: v.nodes })), null, 2));
      assert.deepEqual(result.violations.map(v => v.id), [], `Axe ${route} ${width}`);
      if (route !== '/') await page.screenshot({ path: `qa/${route.split('/').filter(Boolean).join('-')}-${width}.png`, fullPage: true });
      report.push({ route, width, axe: 'PASS', overflow: false, reducedMotion: 'PASS' });
    }
    assert.deepEqual(errors, [], 'Console/network');
    await context.close();
  }
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
    const sequence = [];
    for (let i = 0; i < (width < 1000 ? 4 : 9); i++) {
      await page.keyboard.press('Tab');
      sequence.push(await page.evaluate(() => document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim()));
      const outline = await page.evaluate(() => window.getComputedStyle(document.activeElement).outlineStyle);
      assert.notEqual(outline, 'none');
    }
    assert.match(sequence[0], /Przejdź do treści/);
    if (width < 1000) {
      assert.match(sequence[2], /Zadzwoń/);
      assert.match(sequence[3], /Menu/);
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), 'Usługi');
      await page.keyboard.press('Escape');
      assert.equal(await page.getByRole('button', { name: 'Menu' }).evaluate(el => el === document.activeElement), true);
    } else {
      assert.equal(sequence[2], 'Usługi');
      assert.match(sequence[8], /Zadzwoń/);
      const art = page.locator('.cinematic-art');
      await page.mouse.move(1100, 500);
      await page.waitForTimeout(800);
      assert.notEqual(await art.evaluate(el => window.getComputedStyle(el).transform), 'matrix(1, 0, 0, 1, 0, 0)');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      assert.equal(await art.evaluate(el => window.getComputedStyle(el).transform), 'none');
    }
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    await page.screenshot({ path: `qa/text-200-${width}.png`, fullPage: true });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, `Text 200% ${width}`);
    report.push({ width, keyboard: sequence, text200: 'PASS', motion: 'PASS' });
    await context.close();
  }
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  const page = await nojs.newPage();
  await page.goto('http://localhost:4322/');
  assert.equal(await page.getByRole('navigation', { name: 'Menu główne' }).isVisible(), true);
  await page.getByRole('link', { name: 'Usługi', exact: true }).click();
  assert.match(page.url(), /#uslugi$/);
  report.push({ noJavaScript: 'PASS' });
  await nojs.close();
  console.log(JSON.stringify(report, null, 2));
  await writeFile('qa/final.json', JSON.stringify(report, null, 2));
} finally { await browser.close(); }




