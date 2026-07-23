import type { Page } from '@playwright/test';

type PswpWindow = Window & {
  pswp?: {
    opener?: { isOpening?: boolean; isClosing?: boolean };
  };
};

/** Wait until PhotoSwipe has finished its open animation and accepts input. */
export async function waitForLightboxReady(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const pswp = (window as PswpWindow).pswp;
    return Boolean(pswp && !pswp.opener?.isOpening && !pswp.opener?.isClosing);
  });
}

/** Wait until PhotoSwipe has fully closed and been destroyed. */
export async function waitForLightboxClosed(page: Page): Promise<void> {
  await page.waitForFunction(() => !(window as PswpWindow).pswp);
}
