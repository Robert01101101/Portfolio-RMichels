//_____________________________________________________________________________________________________ FOOTER
const emailOverlay = document.getElementById("emailOverlay");
const email = document.getElementById("email");
const emailLink = document.getElementById("emailLink");
var overContainer = false;

//Show / hide email
/*
function overEmailOverlay(){
  if (emailOverlay.classList.contains("hide")) emailOverlay.classList.remove("hide");
}

function outEmailOverlay(){
    if (!emailOverlay.classList.contains("hide") && !overContainer) emailOverlay.classList.add("hide");
}

function overEmailContainer(){
    overContainer = true;
}
  
function outEmailContainer(){
    overContainer = false;
    if (!emailOverlay.classList.contains("hide")) emailOverlay.classList.add("hide");
}
*/

//Attach right click listener
emailLink.addEventListener(
  "contextmenu",
  function (ev) {
    ev.preventDefault();
    copyText(document.querySelector(".js-emaillink"));
    return false;
  },
  false
);

//Copy Text
var copyEmailBtn = document.querySelector(".js-emailcopybtn");
let copyConfirm = document.getElementById("copyConfirm");

/*
copyEmailBtn.addEventListener('click', function(event) {
  // Select the email link anchor text
  copyText(document.querySelector('.js-emaillink'));
});*/

function copyText(element) {
  /*
    var range, selection, worked;
  
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();        
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }*/

  var textArea = document.createElement("textarea");
  // Place in the top-left corner of screen regardless of scroll position.
  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;
  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;
  // Clean up any borders.
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  // Avoid flash of the white box if rendered for any reason.
  textArea.style.background = "transparent";

  textArea.value = "hi@rmichels.com";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.log("unable to copy text");
    copyConfirm.innerHTML = "Unable to copy";
  }

  document.body.removeChild(textArea);

  if (copyConfirm.classList.contains("hidden"))
    copyConfirm.classList.remove("hidden");
  removeMessage();

  window.getSelection().removeAllRanges();
}

//confirm message follows mouse
const onMouseMove = (e) => {
  copyConfirm.style.left = e.pageX + "px";
  copyConfirm.style.top = e.pageY + "px";
};
document.addEventListener("mousemove", onMouseMove);

function removeMessage() {
  setTimeout(() => {
    if (!copyConfirm.classList.contains("hidden"))
      copyConfirm.classList.add("hidden");
  }, 2200);
}
