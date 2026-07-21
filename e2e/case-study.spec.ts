import { test, expect } from './fixtures';

test.describe('case study', () => {
  test('/futureEarth shows hero, meta, and gallery', async ({ page }) => {
    await page.goto('/futureEarth');

    await expect(page.locator('#projLanding h1')).toHaveText('Future Earth');
    await expect(page.locator('#projMeta')).toBeVisible();
    await expect(page.locator('#projMeta')).toContainText('Type');
    await expect(page.locator('#projMeta')).toContainText('2020');
    const galleryImages = page.locator('#projContent .sectionMedia figure img');
    await expect(galleryImages).not.toHaveCount(0);

    const firstImage = galleryImages.first();
    await firstImage.scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => typeof (window as Window & { viewImage?: () => void }).viewImage === 'function',
    );
    await firstImage.click();
    await expect(page.locator('#imageViewer')).not.toHaveClass(/hidden/);

    await page.keyboard.press('Escape');
    await expect(page.locator('#imageViewer')).toHaveClass(/hidden/);
  });

  test('/de/futureEarth shows German project type meta', async ({ page }) => {
    await page.goto('/de/futureEarth');

    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.locator('#projMeta')).toContainText('VR-Spiel');
  });
});
