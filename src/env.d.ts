/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type Lenis from 'lenis';

type ScrollLenis = Lenis & {
  on?(event: 'scroll', callback: (args: { animatedScroll: number }) => void): void;
};

declare global {
  interface Window {
    lenis?: ScrollLenis;
    locoScroll?: { update: () => void };
    viewImage?: (source: HTMLElement | string, carousel?: boolean) => void;
    closeImageViewer?: () => void;
    plusSlides?: (n: number) => void;
  }
}

export {};
