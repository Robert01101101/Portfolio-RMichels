export function initDownArrow() {
  const downArrow = document.getElementById('downArrow');
  if (!downArrow) return;

  const updateArrow = (scrollY: number) => {
    if (scrollY > window.innerHeight * 0.6) downArrow.classList.add('hide');
    else downArrow.classList.remove('hide');
  };

  window.addEventListener('load', () => {
    if (window.lenis) {
      window.lenis.on('scroll', (args: { animatedScroll: number }) => updateArrow(args.animatedScroll));
    } else {
      window.addEventListener('scroll', () => updateArrow(window.scrollY));
    }
  });
}

initDownArrow();
