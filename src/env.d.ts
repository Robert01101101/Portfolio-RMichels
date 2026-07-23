/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare global {
  interface Window {
    locoScroll?: { update: () => void };
    viewImage?: (source: HTMLElement | string) => void;
  }
}

export {};
