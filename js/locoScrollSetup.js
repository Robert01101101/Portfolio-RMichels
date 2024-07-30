document.addEventListener('DOMContentLoaded', () => {
  window.locoScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });

  // Disable scrolling initially
  locoScroll.stop();
  const downArrow =  document.getElementById("downArrow");

  // Get ready to unhide down arrow
  if (downArrow != null) setTimeout(() => downArrow.classList.remove('forceHide'), 500);

  // Enable scrolling after delay
  setTimeout(() => {
    locoScroll.start();
    document.documentElement.classList.remove('no-scroll');
    
    if (downArrow != null) downArrow.classList.remove('hide');
    console.log("done waiting, scrolling enabled")
    updateScrollSpeedForScreenSize();
  }, 600);

  updateScrollSpeedForScreenSize();
});

function updateScrollSpeedForScreenSize() {
    //console.log('updateScrollSpeedForScreenSize');
    const projLabels = document.querySelectorAll('.projLabel');
    const projMeta = document.querySelectorAll('.projMeta');
    
    projLabels.forEach(projLabel => {
      if (window.innerHeight > window.innerWidth) {
        //vertical
        projLabel.setAttribute('data-scroll-speed', "0.4");
      } else {
        projLabel.setAttribute('data-scroll-speed', "1.8");
      }
    });

    projMeta.forEach(projMeta => {
        if (window.innerHeight > window.innerWidth) {
          //vertical
          projMeta.setAttribute('data-scroll-speed', "0.4");
          projMeta.setAttribute('data-scroll', '');
          
        } else {
          projMeta.removeAttribute('data-scroll-speed');
          projMeta.removeAttribute('data-scroll');
          projMeta.removeAttribute('style');
        }
      });

    if (window.locoScroll == null) return;
    window.locoScroll.update();
}

// Initial check
updateScrollSpeedForScreenSize();

// Update on resize
window.addEventListener('resize', updateScrollSpeedForScreenSize);