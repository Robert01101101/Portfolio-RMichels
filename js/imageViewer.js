//_______________________________________________________________________________________________ Open & Close Image Viewer
//_____________________________________ Open //
const imageViewer = document.getElementById('imageViewer');
var body = document.getElementsByTagName("BODY")[0];//const body = document.getElementById('Content');
var mainGrid = document.getElementById('MainGrid');
var viewerOpen = false;
var newDiv, clone, originImage, next, prev, closeBtn, expand, compress;
var zoomed = false;
var origInnerHTML = imageViewer.innerHTML;

function viewImage (sourceImage, carousel=false) {

    if (typeof sourceImage === 'string' || sourceImage instanceof String){
        sourceImage = document.getElementById(sourceImage);
    }

    if (viewerOpen && !carousel) {
        //closeImageViewer();
    } else {
        document.documentElement.classList.add("stop-scrolling");
        body.classList.add("stop-scrolling");
        mainGrid.classList.add("stop-scrolling");

        tmpDisableImg = true;

        //clone image
        imageViewer.innerHTML = '';
        originImage = sourceImage;
        viewerOpen = true;
        clone = sourceImage.cloneNode(true)
        clone.removeAttribute("onclick");
        //add cloned image
        imageViewer.appendChild(clone);
        clone.innerHTML += origInnerHTML;

        //Get references
        var img = sourceImage.getElementsByTagName('img')[0];
        var imageNode = clone.getElementsByTagName('img')[0];
        /*
        //determine aspect ratio
        var imgHeight = img.height
        var imgWidth = img.width;
        var aspectRatio = imgWidth/imgHeight;*/

        //Unhide viewer
        if (imageViewer.classList.contains('hidden')) imageViewer.classList.remove('hidden');

        //Carousel setup
        if (!carousel) initCarousel();
        var loadDelay = 10;
        next = document.getElementsByClassName("next")[0];
        prev = document.getElementsByClassName("prev")[0];
        expand = document.getElementsByClassName("fa-expand")[0];
        compress = document.getElementsByClassName("fa-compress")[0];
        closeBtn = document.getElementsByClassName("closeBtn")[0];
        next.classList.add("hidden");
        prev.classList.add("hidden");
        closeBtn.classList.add("hidden");
        setTimeout(function() {
            tmpDisableImg = false;
            updateArrows();

        }, loadDelay);

        //Configure depending on image dimensions
        setTimeout(function() {
            //If the image original height is much taller than the available window, show zoom options
            if ((img.naturalHeight > window.innerHeight + window.innerHeight/10) || sourceImage.hasAttribute("fullscreen")){

                //Show Zoom Options
                clone.classList.add("tall");
                //Add scroll container div to keep fullscreen icon at top
                clone.innerHTML = origInnerHTML;
                newDiv = document.createElement("div");
                newDiv.id = "imgOverlayDivContainer";
                newDiv = clone.appendChild(newDiv);
                newDiv.appendChild(imageNode);
            } else {

                //Hide Zoom Options
                var fullScreenIcons = [];
                fullScreenIcons = clone.getElementsByTagName('i');
                fullScreenIcons = Array.prototype.slice.call(fullScreenIcons);

                fullScreenIcons.forEach(element => {
                    if(!element.classList.contains("hidden")) element.classList.add("hidden");
                });
            }

            //if figcaption is not in this figure, but its parent (group), reattach it
            var captionNode = clone.getElementsByTagName('figcaption')[0];
            if (captionNode === undefined){
                var parent = originImage.parentNode.parentNode;
                captionNode = parent.getElementsByTagName('figcaption')[0];
                captionNode = captionNode.cloneNode(true);
                if (captionNode != undefined){
                    clone.appendChild(captionNode);
                }
            }

            //If no space at the bottom for caption, make it an overlay caption
            if (((imageNode.offsetHeight > window.innerHeight - 100) || sourceImage.hasAttribute("fullscreen")) && captionNode != undefined){
                captionNode.classList.add("fullscreenCaption");
            }

        }, loadDelay*2);
    }
}


//_____________________________________ Close //
function closeImageViewer() {
    viewerOpen = false;
    zoomed = false;
    //hide & clear viewer
    if (!imageViewer.classList.contains('hidden')) imageViewer.classList.add('hidden');
    imageViewer.innerHTML = origInnerHTML;

    if (document.documentElement.classList.contains("stop-scrolling")) document.documentElement.classList.remove("stop-scrolling");
    if (body.classList.contains("stop-scrolling")) body.classList.remove("stop-scrolling");
    if (mainGrid.classList.contains("stop-scrolling")) mainGrid.classList.remove("stop-scrolling");
}

//detect click outside Image
var tmpDisableImg = false;

document.addEventListener('click', function(event) {
  if (!imageViewer.classList.contains("hidden") && !tmpDisableImg){
    var isClickInside = clone.contains(event.target);
    if (!isClickInside) {
        closeImageViewer();
    }
  }
});

//Exit when pressing Escape
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    var isLeft = false;
    var isRight = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
        isLeft = (evt.key === "ArrowLeft");
        isRight = (evt.key === "ArrowRight");
    } else {
        isEscape = (evt.keyCode === 27);
        isLeft = (evt.keyCode === 37);
        isRight = (evt.keyCode === 39);
    }
    if (isEscape) {
        closeImageViewer();
    } else if (isLeft) {
        plusSlides(-1);
    } else if (isRight) {
        plusSlides(1);
    }
};







//_______________________________________________________________________________________________ Toggle Fullscreen
function expandView(item){
    document.getElementById("fullScreenExpand").classList.add('hidden');
    document.getElementById("fullScreenCompress").classList.remove('hidden');
    document.getElementById("imgOverlayDivContainer").classList.remove('tall');
    item.classList.add("hidden");
    zoomed = false;
}

function compressView(item){
    document.getElementById("fullScreenExpand").classList.remove('hidden');
    document.getElementById("fullScreenCompress").classList.add('hidden');
    document.getElementById("imgOverlayDivContainer").classList.add('tall');
    item.classList.add("hidden");
    zoomed = true;
}






//_______________________________________________________________________________________________ Image Carousel
//from https://www.w3schools.com/howto/howto_js_slideshow.asp
var allImages = document.querySelectorAll('figure'); 
var imgArray = [];
for(var i = 0; i < allImages.length; i++) {
    if (!allImages[i].hasAttribute("ignorecarousel")) imgArray.push(allImages[i]);
}


var slideIndex;

function initCarousel(){
    var originIndex;

    for (i = 0; i < imgArray.length; i++) {
        if (imgArray[i] === originImage) originIndex = i;
    }

    slideIndex = originIndex;
}

// Next/previous controls
function plusSlides(n) {
    zoomed = false;
    if (slideIndex === 0 && n < 0 || slideIndex === imgArray.length-1 && n > 0) return;
    slideIndex += n;
    viewImage(imgArray[slideIndex], true);
}

//Detect swipes (from https://stackoverflow.com/a/56663695)
let touchstartX = 0
let touchendX = 0

function checkDirection() {
  if (zoomed || !viewerOpen) return;
  if (touchendX < touchstartX) plusSlides(+1);
  if (touchendX > touchstartX) plusSlides(-1);
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})










function updateArrows() {
    //Place next / prev buttons inside of image if there isn't enough of a margin to the left / right
    var windowWidth = document.body.clientWidth;
    if (!clone) return;
    var imgWidth = clone.getBoundingClientRect().width;

    if (windowWidth - imgWidth < 170) {
        if (!next.classList.contains('flip')) next.classList.add('flip');
        if (!prev.classList.contains('flip')) prev.classList.add('flip');
        if (!closeBtn.classList.contains('flip')) closeBtn.classList.add('flip');
        if (!expand.classList.contains('flip')) expand.classList.add('flip');
        if (!compress.classList.contains('flip')) compress.classList.add('flip');
    } else {
        if (next.classList.contains('flip')) next.classList.remove('flip');
        if (prev.classList.contains('flip')) prev.classList.remove('flip');
        if (closeBtn.classList.contains('flip')) closeBtn.classList.remove('flip');
        if (expand.classList.contains('flip')) expand.classList.remove('flip');
        if (compress.classList.contains('flip')) compress.classList.remove('flip');
    }
    next.classList.remove("hidden");
    prev.classList.remove("hidden");
    closeBtn.classList.remove("hidden");

    //hide l/r arrow if at start/end of carousel
    if (slideIndex == 0) {
        if (!prev.classList.contains('end')) { prev.classList.add('end');}
    } else if (slideIndex == imgArray.length-1) {
        if (!next.classList.contains("end")) next.classList.add("end");
    } else {
        if (prev.classList.contains("end")) prev.classList.remove("end");
        if (next.classList.contains("end")) next.classList.remove("end");
    }
}
  
window.onresize = updateArrows;


function is_touch_enabled() { 
    return ( 'ontouchstart' in window ) ||  
           ( navigator.maxTouchPoints > 0 ) ||  
           ( navigator.msMaxTouchPoints > 0 ); 
} 

if (is_touch_enabled()) imageViewer.classList.add("touchscreen");
