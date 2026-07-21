import { test, expect } from './fixtures';

test.describe('LQIP swap', () => {
  test('tile images swap from /lqip/ when scrolled into view', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    // HomeFilter shows at most six homepage tiles when no ?filter= is set.
    const tileImages = page.locator('#MyWork .projRow:not(.projRow--hidden) img');
    const count = await tileImages.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(6);

    // Visible tiles should swap without scrolling.
    await expect(tileImages.first()).not.toHaveAttribute('src', /\/lqip\//);

    // Scroll remaining visible tiles into the observer root margin.
    for (let i = 1; i < count; i++) {
      await tileImages.nth(i).scrollIntoViewIfNeeded();
    }

    await expect.poll(async () => {
      let swapped = 0;
      for (let i = 0; i < count; i++) {
        const src = await tileImages.nth(i).getAttribute('src');
        if (src && !src.includes('/lqip/')) swapped++;
      }
      return swapped;
    }).toBe(count);
  });
});
