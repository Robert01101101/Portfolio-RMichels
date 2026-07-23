import { getScrollLenis } from '../lib/scroll-lenis';

function mapVal(num: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

function offset(el: Element) {
  return el.getBoundingClientRect().top;
}

function getVisibleElements(selector: string): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(selector)).filter((el) => {
    const row = el.closest('.projRow');
    return row && !row.classList.contains('projRow--hidden');
  });
}

const PARALLAX_SELECTORS = [
  '.projRow:not(.projRow--hidden) .projJScontainer',
  '.projRow:not(.projRow--hidden) .projLabel',
] as const;

function isWideLayout() {
  return window.innerWidth >= 1200 && window.matchMedia('(orientation: landscape)').matches;
}

export function initProjectTileParallax() {
  let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;

  const getElements = () => {
    if (isWideLayout()) {
      return getVisibleElements('.projRow:not(.projRow--hidden) .projLabel');
    }
    return getVisibleElements('.projRow:not(.projRow--hidden) .projJScontainer');
  };

  const resetInactiveParallaxStyles = (active: HTMLElement[]) => {
    const activeSet = new Set(active);

    PARALLAX_SELECTORS.forEach((selector) => {
      getVisibleElements(selector).forEach((el) => {
        if (!activeSet.has(el)) {
          el.style.transform = '';
          el.style.willChange = '';
        }
      });
    });
  };

  const setWillChange = (active: boolean) => {
    const prop = active ? 'transform' : '';
    getElements().forEach((el) => {
      el.style.willChange = prop;
    });
  };

  const update = () => {
    const active = getElements();
    resetInactiveParallaxStyles(active);

    const buffer = 50;
    let min = -80;
    let max = 100;
    if (!isWideLayout()) {
      min = -40;
      max = 0;
    }

    active.forEach((curElement) => {
      const yPos = offset(curElement);
      const bottomVal = clamp(
        mapVal(yPos, 0, window.innerHeight, max, min),
        min - buffer,
        max + buffer,
      );
      curElement.style.transform = `translateY(${-bottomVal}px)`;
    });
  };

  const scheduleScrollEnd = () => {
    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => setWillChange(false), 150);
  };

  const onScroll = () => {
    setWillChange(true);
    update();
    scheduleScrollEnd();
  };

  const hookLenis = () => {
    const lenis = getScrollLenis();
    if (lenis) {
      lenis.on('scroll', onScroll);
      onScroll();
      return;
    }
    requestAnimationFrame(hookLenis);
  };

  window.addEventListener('resize', onScroll, { passive: true });
  hookLenis();
}

initProjectTileParallax();
