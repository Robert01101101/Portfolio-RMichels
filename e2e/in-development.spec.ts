import { test, expect } from './fixtures';

test.describe('in-development routing', () => {
  test('tourguide tile links to /development/tourguide', async ({ page }) => {
    await page.goto('/projects');

    const tourguideLink = page.locator('.projRow a[href="/development/tourguide"]');
    await expect(tourguideLink).toBeVisible();

    await tourguideLink.click();

    await expect(page).toHaveURL(/\/development\/tourguide$/);
    await expect(page.locator('#projLanding h1')).toHaveText('Tourguide');
  });
});
