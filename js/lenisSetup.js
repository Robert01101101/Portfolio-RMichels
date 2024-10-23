/*document.addEventListener('DOMContentLoaded', () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Disable scrolling initially
  lenis.stop();
  const downArrow = document.getElementById("downArrow");

  // Get ready to unhide down arrow
  if (downArrow != null) setTimeout(() => downArrow.classList.remove('forceHide'), 500);

  // Enable scrolling after delay
  setTimeout(() => {
    lenis.start();
    document.documentElement.classList.remove('no-scroll');
    
    if (downArrow != null) downArrow.classList.remove('hide');
    console.log("done waiting, scrolling enabled");
    updateScrollSpeedForScreenSize();
  }, 600);

  updateScrollSpeedForScreenSize();
});

function updateScrollSpeedForScreenSize() {
  const projLabels = document.querySelectorAll('.projLabel');
  const projMeta = document.querySelectorAll('.projMeta');
  
  projLabels.forEach(projLabel => {
    if (window.innerHeight > window.innerWidth) {
      //vertical
      projLabel.setAttribute('data-lenis-speed', "0.4");
    } else {
      projLabel.setAttribute('data-lenis-speed', "1.8");
    }
  });

  projMeta.forEach(projMeta => {
    if (window.innerHeight > window.innerWidth) {
      //vertical
      projMeta.setAttribute('data-lenis-speed', "0.4");
    } else {
      projMeta.removeAttribute('data-lenis-speed');
      projMeta.removeAttribute('style');
    }
  });

  if (window.lenis) {
    window.lenis.update();
  }
}

// Initial check
updateScrollSpeedForScreenSize();

// Update on resize
window.addEventListener('resize', updateScrollSpeedForScreenSize);

*/









// Initialize Lenis
const lenis = new Lenis();

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
