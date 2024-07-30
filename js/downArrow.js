//window.addEventListener("scroll", updateArrow);
var downArrow = document.getElementById('downArrow');

window.addEventListener('load', () => {
    if (window.locoScroll) {
      window.locoScroll.on('scroll', (args) => {
        updateArrow(args.scroll);
      });
    }
});

//_________________________________________ on Scroll
function updateArrow(ev) {
    const scrollY = ev.y || window.scrollY;
	if (scrollY > window.innerHeight * 0.6) { 
        //console.log("hide");
        downArrow.classList.add("hide");
    } else {
        downArrow.classList.remove("hide");
    }
}