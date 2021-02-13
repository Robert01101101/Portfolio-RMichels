window.addEventListener("scroll", updateArrow);
var downArrow = document.getElementById('downArrow');

//_________________________________________ on Scroll
function updateArrow(ev) {
	if (window.scrollY > 400) { 
        console.log("hide");
        downArrow.classList.add("hide");
    } else {
        downArrow.classList.remove("hide");
    }
}