/**
 * Scroll performance assessment for low-powered device simulation.
 * Usage: node scripts/assess-scroll-perf.mjs [throttleRates...]
 * Default throttle rates: 4 6 (Chrome DevTools CPU throttling multipliers)
 */
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const PAGES = [
  { label: 'homepage', url: '/', ready: '#landingArea' },
  { label: 'projects', url: '/projects', ready: '#Projects' },
  { label: 'clirioScanViews', url: '/clirioScanViews', ready: '#projLanding h1' },
];

const BASE_URL = 'http://localhost:4321';
const SCROLL_MS = 5000;

async function startPreview() {
  const child = spawn('npm', ['run', 'preview'], {
    cwd: ROOT,
    shell: true,
    stdio: 'ignore',
  });

  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE_URL);
      if (res.ok) return child;
    } catch {
      // not ready
    }
    await delay(500);
  }

  child.kill();
  throw new Error('Preview server did not start on port 4321. Run: npm run build && npm run preview');
}

async function blockExternalCdn(page) {
  const blocked = ['googletagmanager.com', 'unpkg.com'];
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (blocked.some((host) => url.includes(host))) return route.abort();
    return route.continue();
  });
}

async function enableCpuThrottle(page, rate) {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate });
}

async function waitForScrollEffectsReady(page) {
  await page
    .waitForFunction(() => {
      const canvas = document.querySelector('.wavesCanvas');
      if (!canvas) return true;
      return getComputedStyle(canvas).visibility === 'visible';
    }, { timeout: 15_000 })
    .catch(() => {});
  await page.waitForTimeout(500);
}

async function measureScrollPerformance(page) {
  await page.mouse.move(640, 360);

  await page.evaluate(() => {
    window.__scrollPerf = { frameTimes: [], sampling: true, longTasks: 0 };
    let last = performance.now();
    let isFirst = true;
    const sample = (now) => {
      const perf = window.__scrollPerf;
      if (!perf?.sampling) return;
      if (!isFirst) perf.frameTimes.push(now - last);
      else isFirst = false;
      last = now;
      perf.rafId = requestAnimationFrame(sample);
    };
    window.__scrollPerf.rafId = requestAnimationFrame(sample);
    try {
      const observer = new PerformanceObserver((list) => {
        if (window.__scrollPerf) window.__scrollPerf.longTasks += list.getEntries().length;
      });
      observer.observe({ type: 'longtask', buffered: true });
      window.__scrollPerf.observer = observer;
    } catch {}
  });

  const start = Date.now();
  while (Date.now() - start < SCROLL_MS) {
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(16);
  }
  const durationMs = Date.now() - start;

  return page.evaluate((measuredMs) => {
    const perf = window.__scrollPerf;
    perf.sampling = false;
    if (perf.rafId !== undefined) cancelAnimationFrame(perf.rafId);
    perf.observer?.disconnect();
    const sorted = [...perf.frameTimes].sort((a, b) => a - b);
    const pct = (p) => {
      if (!sorted.length) return 0;
      const idx = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
      return sorted[Math.max(0, idx)];
    };
    return {
      frameCount: perf.frameTimes.length,
      p50: pct(50),
      p95: pct(95),
      max: sorted.at(-1) ?? 0,
      framesOver50ms: perf.frameTimes.filter((t) => t > 50).length,
      framesOver100ms: perf.frameTimes.filter((t) => t > 100).length,
      framesOver200ms: perf.frameTimes.filter((t) => t > 200).length,
      longTasks: perf.longTasks,
      durationMs: measuredMs,
    };
  }, durationMs);
}

function fpsFromFrameMs(ms) {
  return ms > 0 ? Math.round(1000 / ms) : 0;
}

function grade(metrics) {
  const { p50, p95, max, framesOver50ms, framesOver100ms } = metrics;
  if (p95 > 100 || max > 300 || framesOver100ms > 5) return 'poor';
  if (p95 > 50 || max > 200 || framesOver50ms > 15) return 'fair';
  if (p95 > 33 || max > 100) return 'good';
  return 'excellent';
}

const throttleRates = process.argv.slice(2).map(Number).filter((n) => n >= 1);
const rates = throttleRates.length ? throttleRates : [4, 6];

let preview;
try {
  await fetch(BASE_URL);
} catch {
  preview = await startPreview();
}

const browser = await chromium.launch();
const results = [];

for (const rate of rates) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  await blockExternalCdn(page);
  await enableCpuThrottle(page, rate);

  for (const { label, url, ready } of PAGES) {
    await page.goto(`${BASE_URL}${url}`);
    await page.locator(ready).waitFor({ state: 'visible' });
    await waitForScrollEffectsReady(page);
    const metrics = await measureScrollPerformance(page);
    results.push({ throttle: rate, page: label, ...metrics, grade: grade(metrics) });
  }

  await context.close();
}

await browser.close();
if (preview) preview.kill();

console.log('\n=== Scroll performance assessment (simulated low-powered laptop) ===\n');
console.log(
  'Throttle | Page            | p50   | p95   | max   | ~FPS(p50) | >50ms | >100ms | longTasks | Grade',
);
console.log(
  '---------|-----------------|-------|-------|-------|-----------|-------|--------|-----------|--------',
);

for (const r of results) {
  console.log(
    `${String(r.throttle).padEnd(8)} | ${r.page.padEnd(15)} | ${r.p50.toFixed(1).padStart(5)} | ${r.p95.toFixed(1).padStart(5)} | ${r.max.toFixed(1).padStart(5)} | ${String(fpsFromFrameMs(r.p50)).padStart(9)} | ${String(r.framesOver50ms).padStart(5)} | ${String(r.framesOver100ms).padStart(6)} | ${String(r.longTasks).padStart(9)} | ${r.grade}`,
  );
}

console.log('\nReference: 60fps = 16.7ms/frame, 30fps = 33.3ms, 20fps = 50ms\n');
console.log(JSON.stringify(results, null, 2));
