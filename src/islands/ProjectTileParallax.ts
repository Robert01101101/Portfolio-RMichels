function mapVal(num: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

function offset(el: Element) {
  return el.getBoundingClientRect().top;
}

export function initProjectTileParallax() {
  const projLabel = document.querySelectorAll<HTMLElement>('.projLabel');
  const projJScontainer = document.querySelectorAll<HTMLElement>('.projJScontainer');

  if (projLabel.length === 0 && projJScontainer.length === 0) return;

  const xlBreakPoint = 1200;
  let ticking = false;

  const update = () => {
    ticking = false;
    const buffer = 50;
    let min = -80;
    let max = 100;
    let elementsToOffset: NodeListOf<HTMLElement> = projLabel;
    if (window.innerWidth < xlBreakPoint) {
      min = -40;
      max = 0;
      elementsToOffset = projJScontainer;
    }
    elementsToOffset.forEach((curElement) => {
      const yPos = offset(curElement);
      const bottomVal = clamp(
        mapVal(yPos, 0, window.innerHeight, max, min),
        min - buffer,
        max + buffer,
      );
      curElement.style.transform = `translateY(${-bottomVal}px)`;
    });
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

initProjectTileParallax();
