//_____________________________________________________________________________________________________ FOOTER
var emailOverlay = document.getElementById('emailOverlay');
var email = document.getElementById('email');
var overContainer = false;

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


//Copy Text
var copyEmailBtn = document.querySelector('.js-emailcopybtn');
let copyConfirm = document.getElementById('copyConfirm');

copyEmailBtn.addEventListener('click', function(event) {
  // Select the email link anchor text
  copyText(document.querySelector('.js-emaillink'));
});

function copyText(element) {
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
    }
    
    try {
      document.execCommand('copy');
    }
    catch (err) {
      console.log('unable to copy text');
      copyConfirm.innerHTML = "Unable to copy";
    }

    if (copyConfirm.classList.contains("hidden")) copyConfirm.classList.remove("hidden");
    removeMessage();

    window.getSelection().removeAllRanges();
}




  
//confirm message follows mouse
const onMouseMove = (e) =>{
    copyConfirm.style.left = e.pageX + 'px';
    copyConfirm.style.top = e.pageY + 'px';
}
document.addEventListener('mousemove', onMouseMove);


function removeMessage(){
    setTimeout(() => {  if (!copyConfirm.classList.contains("hidden")) copyConfirm.classList.add("hidden"); }, 2200);
}