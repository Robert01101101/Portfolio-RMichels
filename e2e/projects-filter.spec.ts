import { test, expect } from './fixtures';

test.describe('projects page filter', () => {
  test('AND logic updates projectCount and URL filter pre-selects button', async ({ page }) => {
    await page.goto('/projects');

    const projectCount = page.locator('#projectCount');
    const initialCount = Number(await projectCount.textContent());
    expect(initialCount).toBeGreaterThan(0);

    const vrBtn = page.locator('.filterBtn[data-js="vr"]');
    const frontEndBtn = page.locator('.filterBtn[data-js="front-end"]');

    await vrBtn.click();
    await expect(vrBtn).toHaveClass(/filterBtn--selected/);
    await expect(projectCount).toHaveText('3');

    await frontEndBtn.click();
    await expect(frontEndBtn).toHaveClass(/filterBtn--selected/);
    await expect(projectCount).toHaveText('1');

    await page.goto('/projects?filter=vr');
    await expect(page.locator('.filterBtn[data-js="vr"]')).toHaveClass(/filterBtn--selected/);
  });
});
