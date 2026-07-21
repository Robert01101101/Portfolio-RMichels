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

export function initProjectTileParallax() {
  const xlBreakPoint = 1200;
  let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;

  const getElements = () => {
    if (window.innerWidth < xlBreakPoint) {
      return getVisibleElements('.projRow:not(.projRow--hidden) .projJScontainer');
    }
    return getVisibleElements('.projRow:not(.projRow--hidden) .projLabel');
  };

  const setWillChange = (active: boolean) => {
    const prop = active ? 'transform' : '';
    getElements().forEach((el) => {
      el.style.willChange = prop;
    });
  };

  const update = () => {
    const buffer = 50;
    let min = -80;
    let max = 100;
    if (window.innerWidth < xlBreakPoint) {
      min = -40;
      max = 0;
    }

    getElements().forEach((curElement) => {
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
