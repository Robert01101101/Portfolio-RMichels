import { test, expect } from './fixtures';

test.describe('LQIP swap', () => {
  test('tile images no longer use /lqip/ paths after load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    const tileImages = page.locator('#MyWork .projRow img');
    const count = await tileImages.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const src = await tileImages.nth(i).getAttribute('src');
      expect(src).not.toContain('/lqip/');
    }
  });
});
