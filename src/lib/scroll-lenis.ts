import type Lenis from 'lenis';

let scrollLenis: Lenis | undefined;

export function setScrollLenis(instance: Lenis): void {
  scrollLenis = instance;
}

export function getScrollLenis(): Lenis | undefined {
  return scrollLenis;
}
