import { test, expect } from './fixtures';
import {
  SCROLL_PERF_BUDGETS,
  SCROLL_PERF_PAGE_BUDGETS,
  disableCpuThrottle,
  enableCpuThrottle,
  formatScrollPerfMetrics,
  getCpuThrottleRate,
  measureScrollPerformance,
  type ScrollPerfMetrics,
  waitForScrollEffectsReady,
} from './lib/scroll-performance';

test.describe('scroll performance @perf', () => {
  test.describe.configure({ mode: 'serial', timeout: 90_000 });
  test.use({ viewport: { width: 1280, height: 720 } });

  const throttleRate = getCpuThrottleRate();

  test.beforeEach(async ({ page }) => {
    await enableCpuThrottle(page, throttleRate);
  });

  test.afterEach(async ({ page }) => {
    await disableCpuThrottle(page);
  });

  function assertScrollBudgets(metrics: ScrollPerfMetrics, pageLabel: string) {
    const budgets = { ...SCROLL_PERF_BUDGETS, ...SCROLL_PERF_PAGE_BUDGETS[pageLabel] };
    const summary = formatScrollPerfMetrics(metrics);
    test.info().annotations.push({ type: 'scroll-perf', description: `${pageLabel}: ${summary}` });

    expect(
      metrics.p95,
      `${pageLabel} p95 frame time ${metrics.p95.toFixed(1)}ms exceeds ${budgets.p95MaxMs}ms (${summary})`,
    ).toBeLessThanOrEqual(budgets.p95MaxMs);

    expect(
      metrics.max,
      `${pageLabel} max frame time ${metrics.max.toFixed(1)}ms exceeds ${budgets.maxFrameMs}ms (${summary})`,
    ).toBeLessThanOrEqual(budgets.maxFrameMs);

    expect(
      metrics.longTasks,
      `${pageLabel} long tasks ${metrics.longTasks} exceed ${budgets.maxLongTasks} (${summary})`,
    ).toBeLessThanOrEqual(budgets.maxLongTasks);
  }

  test(`homepage / (CPU throttle ${throttleRate}x)`, async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#landingArea')).toBeVisible();
    await waitForScrollEffectsReady(page);

    const metrics = await measureScrollPerformance(page);
    assertScrollBudgets(metrics, 'homepage');
  });

  test(`projects /projects (CPU throttle ${throttleRate}x)`, async ({ page }) => {
    await page.goto('/projects');
    await expect(page.locator('#Projects')).toBeVisible();
    await waitForScrollEffectsReady(page);

    const metrics = await measureScrollPerformance(page);
    assertScrollBudgets(metrics, 'projects');
  });

  test(`case study /clirioScanViews (CPU throttle ${throttleRate}x)`, async ({ page }) => {
    await page.goto('/clirioScanViews');
    await expect(page.locator('#projLanding h1')).toBeVisible();
    await waitForScrollEffectsReady(page);

    const metrics = await measureScrollPerformance(page);
    assertScrollBudgets(metrics, 'clirioScanViews');
  });
});
