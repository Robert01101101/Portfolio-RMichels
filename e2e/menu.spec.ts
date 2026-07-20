import { test, expect } from './fixtures';

test.describe('overlay menu', () => {
  test('opens, closes with Escape, and navigates', async ({ page }) => {
    await page.goto('/');

    const overlay = page.locator('#OverlayMenu');
    const toggle = page.locator('#MenuToggle');

    await expect(overlay).toHaveClass(/hidden/);

    await toggle.click();
    await expect(overlay).not.toHaveClass(/hidden/);

    await page.keyboard.press('Escape');
    await expect(overlay).toHaveClass(/hidden/);

    await toggle.click();
    await page.locator('#MenuContent a[href="/projects"]').click();
    await expect(page).toHaveURL(/\/projects$/);
  });
});
