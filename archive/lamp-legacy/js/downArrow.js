var downArrow = document.getElementById('downArrow');

window.addEventListener('load', () => {
  if (window.lenis && downArrow) {
    window.lenis.on('scroll', (args) => {
      updateArrow(args);
    });
  }
});

function updateArrow(ev) {
  const scrollY = ev.animatedScroll;
  if (scrollY > window.innerHeight * 0.6) { 
    downArrow.classList.add("hide");
  } else {
    downArrow.classList.remove("hide");
  }
}