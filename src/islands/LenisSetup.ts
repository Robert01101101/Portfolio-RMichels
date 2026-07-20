import Lenis from 'lenis';

declare global {
  interface Window {
    lenis?: Lenis;
    locoScroll?: { update: () => void };
  }
}

export function initLenis() {
  let currentlyEnabled = true;
  const stored = localStorage.getItem('lenisSmoothScrolling') !== 'false';

  const createLenis = (enabled: boolean) =>
    new Lenis({
      smoothWheel: enabled,
    });

  window.lenis = createLenis(stored);
  window.locoScroll = { update: () => window.lenis?.resize() };

  function raf(time: number) {
    window.lenis?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const toggle = document.getElementById('lenisScrollToggle') as HTMLInputElement | null;
  if (toggle) {
    toggle.checked = stored;
    toggle.addEventListener('change', (e) => {
      const enabled = (e.target as HTMLInputElement).checked;
      localStorage.setItem('lenisSmoothScrolling', String(enabled));
      if (currentlyEnabled !== enabled) window.location.reload();
      currentlyEnabled = enabled;
    });
  }
}

initLenis();
