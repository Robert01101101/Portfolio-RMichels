import { test, expect } from './fixtures';

test.describe('homepage', () => {
  test('loads and renders project tiles', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Portfolio \| Robert Michels/);
    await expect(page.locator('#landingArea')).toBeVisible();
    await expect(page.locator('#MyWork .projRow')).not.toHaveCount(0);
  });
});
