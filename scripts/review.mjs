import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = [];
for (const width of [360, 390, 768, 1024, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('requestfailed', request => errors.push(request.url() + ': ' + request.failure()?.errorText));
  page.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ': ' + response.url()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `qa/home-${width}.png`, fullPage: true });
  await page.screenshot({ path: 'qa/viewport-' + width + '.png' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  let menu = 'desktop';
  if (width <= 1000) {
    await page.getByRole('button', { name: 'Menu' }).click();
    menu = await page.getByRole('navigation', { name: 'Menu główne' }).isVisible();
    await page.keyboard.press('Escape');
    menu = menu && !(await page.getByRole('navigation', { name: 'Menu główne' }).isVisible());
  }
  report.push({ width, overflow, errors, menu, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })) });
  await context.close();
}
await browser.close();
await writeFile('qa/review.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (report.some(r => r.overflow || r.errors.length || r.violations.length || r.menu === false)) process.exitCode = 1;


