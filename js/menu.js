///
///////////////////////////////////////////////////////////////// Overlay Menu /////////////////////////////////////
///


//___________________________________________________________ Animate Icon (Hamburger / Cross swap)
//https://www.w3schools.com/howto/howto_css_menu_icon.asp

var menuToggle = document.getElementById('MenuToggle');
var overlayMenu = document.getElementById("OverlayMenu");
overlayMenu.classList.add("hidden");

var mainGrid = document.getElementById('MainGrid');
var contentToBlur = document.getElementById("Content");

function toggleMenu() {
  tmpDisable = true;
  menuToggle.classList.toggle("change");
  overlayMenu.classList.toggle("hidden");
  contentToBlur.classList.toggle("blur");
  mainGrid.classList.toggle("noClick");
  console.log("toggle");

  var loadDelay = 200;
  setTimeout(function() {
    tmpDisable = false;
  }, loadDelay);
}



//detect click outside menu
var menuContent = document.getElementById('MenuContent');
var tmpDisable = false;

document.addEventListener('click', function(event) {
  if (!overlayMenu.classList.contains("hidden") && !tmpDisable){
    var isClickInside = menuContent.contains(event.target);

    console.log(menuContent);
    console.log(event.target);
    console.log(isClickInside);

    if (!isClickInside) {
      console.log("clickoutside");
      menuToggle.classList.toggle("change");
      overlayMenu.classList.toggle("hidden");
      contentToBlur.classList.toggle("blur");
      mainGrid.classList.toggle("noClick");
    }
  }
});