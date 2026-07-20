import { test, expect } from './fixtures';

test.describe('language toggle', () => {
  test('/about Deutsch navigates to /de/about with lang=de', async ({ page }) => {
    await page.goto('/about');

    await page.locator('#MenuToggle').click();
    await expect(page.locator('#OverlayMenu')).not.toHaveClass(/hidden/);

    await page.locator('.lang-toggle').click();

    await expect(page).toHaveURL(/\/de\/about$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.locator('#About')).toHaveText('Über Mich');
  });
});
