// @ts-nocheck
export function initImageViewer() {
  const imageViewer = document.getElementById('imageViewer');
  const body = document.body;
  const mainGrid = document.getElementById('MainGrid');
  if (!imageViewer || !mainGrid) return;

  let viewerOpen = false;
  let originImage: HTMLElement | null = null;
  let clone: HTMLElement | null = null;
  let slideIndex = 0;
  const origInnerHTML = imageViewer.innerHTML;

  const allImages = Array.from(document.querySelectorAll('figure')).filter(
    (f) => !f.hasAttribute('ignorecarousel'),
  );

  const closeImageViewer = () => {
    viewerOpen = false;
    imageViewer.classList.add('hidden');
    imageViewer.innerHTML = origInnerHTML;
    document.documentElement.classList.remove('stop-scrolling');
    body.classList.remove('stop-scrolling');
    mainGrid.classList.remove('stop-scrolling');
    bindControls();
  };

  const viewImage = (sourceImage: HTMLElement, carousel = false) => {
    if (typeof sourceImage === 'string') {
      sourceImage = document.getElementById(sourceImage)!;
    }
    if (!sourceImage) return;

    document.documentElement.classList.add('stop-scrolling');
    body.classList.add('stop-scrolling');
    mainGrid.classList.add('stop-scrolling');

    imageViewer.innerHTML = '';
    originImage = sourceImage;
    viewerOpen = true;
    clone = sourceImage.cloneNode(true) as HTMLElement;
    clone.removeAttribute('onclick');
    imageViewer.appendChild(clone);
    clone.innerHTML += origInnerHTML;
    imageViewer.classList.remove('hidden');

    if (!carousel) {
      slideIndex = allImages.indexOf(originImage);
      if (slideIndex < 0) slideIndex = 0;
    }
    bindControls();
  };

  const plusSlides = (n: number) => {
    if (slideIndex === 0 && n < 0) return;
    if (slideIndex === allImages.length - 1 && n > 0) return;
    slideIndex += n;
    viewImage(allImages[slideIndex], true);
  };

  function bindControls() {
    const closeBtn = imageViewer.querySelector('.closeBtn');
    const prev = imageViewer.querySelector('.prev');
    const next = imageViewer.querySelector('.next');
    closeBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      closeImageViewer();
    });
    prev?.addEventListener('click', (e) => {
      e.preventDefault();
      plusSlides(-1);
    });
    next?.addEventListener('click', (e) => {
      e.preventDefault();
      plusSlides(1);
    });
  }

  bindControls();

  document.querySelectorAll<HTMLElement>('#projContent figure[onclick], #projContent figure img').forEach((fig) => {
    const figure = fig.tagName === 'FIGURE' ? fig : fig.closest('figure');
    if (!figure) return;
    figure.style.cursor = 'pointer';
    figure.addEventListener('click', () => viewImage(figure as HTMLElement));
  });

  (window as unknown as { viewImage: typeof viewImage }).viewImage = viewImage;
  (window as unknown as { closeImageViewer: typeof closeImageViewer }).closeImageViewer = closeImageViewer;
  (window as unknown as { plusSlides: typeof plusSlides }).plusSlides = plusSlides;

  document.addEventListener('keydown', (evt) => {
    if (!viewerOpen) return;
    if (evt.key === 'Escape') closeImageViewer();
    if (evt.key === 'ArrowLeft') plusSlides(-1);
    if (evt.key === 'ArrowRight') plusSlides(1);
  });
}

initImageViewer();
