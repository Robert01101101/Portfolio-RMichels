///
///////////////////////////////////////////////////////////////// Overlay Menu /////////////////////////////////////
///


//___________________________________________________________ Animate Icon (Hamburger / Cross swap)
//https://www.w3schools.com/howto/howto_css_menu_icon.asp

var overlayMenu = document.getElementById("OverlayMenu");
overlayMenu.classList.add("hidden");

var contentToBlur = document.getElementById("Content");

function openMenu(x) {
  x.classList.toggle("change");
  overlayMenu.classList.toggle("hidden");
  contentToBlur.classList.toggle("blur");
}
