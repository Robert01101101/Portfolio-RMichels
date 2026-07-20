import { test as base, expect } from '@playwright/test';
import { blockExternalCdn } from '../playwright.config';

export const test = base.extend({
  page: async ({ page }, use) => {
    await blockExternalCdn(page);
    await use(page);
  },
});

export { expect };
