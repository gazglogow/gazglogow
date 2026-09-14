import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const runs = [];
try {
  for (let run = 1; run <= 3; run++) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.addInitScript(() => {
      window.siteMetrics = { lcpMs: 0, cls: 0, longTaskExcessMs: 0 };
      new window.PerformanceObserver(list => { for (const e of list.getEntries()) window.siteMetrics.lcpMs = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new window.PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.siteMetrics.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
      new window.PerformanceObserver(list => { for (const e of list.getEntries()) window.siteMetrics.longTaskExcessMs += Math.max(0, e.duration - 50); }).observe({ type: 'longtask', buffered: true });
    });
    await page.goto('http://127.0.0.1:4322/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    runs.push(await page.evaluate(run => ({ run, ...window.siteMetrics, bytes: window.performance.getEntriesByType('resource').reduce((sum, e) => sum + e.transferSize, 0), requests: window.performance.getEntriesByType('resource').length }), run));
    await context.close();
  }
  const result = { environment: 'Local static Astro preview, Chrome, 390×844, cold cache, 4× CPU slowdown, 1.6 Mbps download, 150 ms latency. Laboratory estimate; not field Core Web Vitals.', runs };
  await writeFile('qa/performance.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally { await browser.close(); }

