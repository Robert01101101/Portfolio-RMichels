import { getScrollLenis } from '../lib/scroll-lenis';

export function initDownArrow() {
  const downArrow = document.getElementById('downArrow');
  if (!downArrow) return;

  const updateArrow = (scrollY: number) => {
    if (scrollY > window.innerHeight * 0.6) downArrow.classList.add('hide');
    else downArrow.classList.remove('hide');
  };

  window.addEventListener('load', () => {
    const lenis = getScrollLenis();
    if (lenis) {
      lenis.on('scroll', (instance) => updateArrow(instance.animatedScroll));
    } else {
      window.addEventListener('scroll', () => updateArrow(window.scrollY));
    }
  });
}

initDownArrow();
