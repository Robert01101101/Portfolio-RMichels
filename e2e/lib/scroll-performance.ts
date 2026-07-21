import type { Page } from '@playwright/test';

export type ScrollPerfBudget = {
  p95MaxMs: number;
  maxFrameMs: number;
  maxLongTasks: number;
};

export const SCROLL_PERF_BUDGETS: ScrollPerfBudget = {
  /** Default p95 frame time during scroll (ms). */
  p95MaxMs: 50,
  /** Default max single-frame time during scroll (ms). */
  maxFrameMs: 200,
  /** Long tasks (>50ms main-thread blocks) during scroll sampling. */
  maxLongTasks: 10,
} as const;

/** Per-route overrides — homepage is heavier (waves + landing model + parallax). */
export const SCROLL_PERF_PAGE_BUDGETS: Record<string, Partial<ScrollPerfBudget>> = {
  homepage: { p95MaxMs: 55, maxFrameMs: 300, maxLongTasks: 6 },
  projects: { p95MaxMs: 50, maxFrameMs: 200, maxLongTasks: 8 },
  clirioScanViews: { p95MaxMs: 50, maxFrameMs: 200, maxLongTasks: 10 },
};

export interface ScrollPerfMetrics {
  frameCount: number;
  p50: number;
  p95: number;
  max: number;
  framesOver50ms: number;
  framesOver100ms: number;
  framesOver200ms: number;
  longTasks: number;
  durationMs: number;
}

declare global {
  interface Window {
    __scrollPerf?: {
      frameTimes: number[];
      sampling: boolean;
      longTasks: number;
      observer?: PerformanceObserver;
      rafId?: number;
    };
  }
}

export function getCpuThrottleRate(): number {
  const raw = process.env.PERF_CPU_THROTTLE;
  if (!raw) return 4;
  const rate = Number(raw);
  return Number.isFinite(rate) && rate >= 1 ? rate : 4;
}

export async function enableCpuThrottle(page: Page, rate: number): Promise<void> {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate });
}

export async function disableCpuThrottle(page: Page): Promise<void> {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
  return sorted[Math.max(0, idx)];
}

export function summarizeFrameTimes(
  frameTimes: number[],
  longTasks: number,
  durationMs: number,
): ScrollPerfMetrics {
  const sorted = [...frameTimes].sort((a, b) => a - b);
  return {
    frameCount: frameTimes.length,
    p50: percentile(sorted, 50),
    p95: percentile(sorted, 95),
    max: sorted.at(-1) ?? 0,
    framesOver50ms: frameTimes.filter((t) => t > 50).length,
    framesOver100ms: frameTimes.filter((t) => t > 100).length,
    framesOver200ms: frameTimes.filter((t) => t > 200).length,
    longTasks,
    durationMs,
  };
}

export async function startFrameSampling(page: Page): Promise<void> {
  await page.evaluate(() => {
    window.__scrollPerf = {
      frameTimes: [],
      sampling: true,
      longTasks: 0,
    };

    let last = performance.now();
    let isFirst = true;

    const sample = (now: number) => {
      const perf = window.__scrollPerf;
      if (!perf?.sampling) return;

      if (!isFirst) {
        perf.frameTimes.push(now - last);
      } else {
        isFirst = false;
      }
      last = now;
      perf.rafId = requestAnimationFrame(sample);
    };

    window.__scrollPerf.rafId = requestAnimationFrame(sample);

    try {
      const observer = new PerformanceObserver((list) => {
        if (window.__scrollPerf) {
          window.__scrollPerf.longTasks += list.getEntries().length;
        }
      });
      observer.observe({ type: 'longtask', buffered: true });
      window.__scrollPerf.observer = observer;
    } catch {
      // longtask is not available in every Chromium build/context.
    }
  });
}

export async function stopFrameSampling(
  page: Page,
  durationMs: number,
): Promise<ScrollPerfMetrics> {
  return page.evaluate((measuredMs) => {
    const perf = window.__scrollPerf;
    if (!perf) {
      throw new Error('Frame sampling was not started');
    }

    perf.sampling = false;
    if (perf.rafId !== undefined) {
      cancelAnimationFrame(perf.rafId);
    }
    perf.observer?.disconnect();

    const sorted = [...perf.frameTimes].sort((a, b) => a - b);
    const pct = (p: number) => {
      if (sorted.length === 0) return 0;
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

export interface ScrollPerfOptions {
  durationMs?: number;
  scrollDelta?: number;
  tickMs?: number;
}

export async function measureScrollPerformance(
  page: Page,
  options: ScrollPerfOptions = {},
): Promise<ScrollPerfMetrics> {
  const durationMs = options.durationMs ?? 5000;
  const scrollDelta = options.scrollDelta ?? 100;
  const tickMs = options.tickMs ?? 16;

  await page.mouse.move(640, 360);
  await startFrameSampling(page);

  const start = Date.now();
  while (Date.now() - start < durationMs) {
    await page.mouse.wheel(0, scrollDelta);
    await page.waitForTimeout(tickMs);
  }

  return stopFrameSampling(page, Date.now() - start);
}

/** Wait for scroll-linked effects (particle waves, etc.) before sampling. */
export async function waitForScrollEffectsReady(page: Page): Promise<void> {
  await page
    .waitForFunction(() => {
      const canvas = document.querySelector<HTMLElement>('.wavesCanvas');
      if (!canvas) return true;
      return getComputedStyle(canvas).visibility === 'visible';
    }, { timeout: 15_000 })
    .catch(() => {
      // Particle waves are skipped on some UAs; continue without them.
    });

  await page.waitForTimeout(500);
}

export function formatScrollPerfMetrics(metrics: ScrollPerfMetrics): string {
  return [
    `frames=${metrics.frameCount}`,
    `p50=${metrics.p50.toFixed(1)}ms`,
    `p95=${metrics.p95.toFixed(1)}ms`,
    `max=${metrics.max.toFixed(1)}ms`,
    `>50ms=${metrics.framesOver50ms}`,
    `>100ms=${metrics.framesOver100ms}`,
    `>200ms=${metrics.framesOver200ms}`,
    `longTasks=${metrics.longTasks}`,
  ].join(', ');
}
