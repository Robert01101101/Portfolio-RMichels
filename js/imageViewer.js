//_______________________________________________________________________________________________ Open & Close Image Viewer
//_____________________________________ Open //
const imageViewer = document.getElementById('imageViewer');
var body = document.getElementsByTagName("BODY")[0];//const body = document.getElementById('Content');
var mainGrid = document.getElementById('MainGrid');
var viewerOpen = false;
var newDiv, clone, originImage, next, prev, closeBtn, expand, compress;
var origInnerHTML = imageViewer.innerHTML;

function viewImage (sourceImage, carousel=false) {

    console.log(sourceImage);

    if (viewerOpen && !carousel) {
        //closeImageViewer();
    } else {
        tmpDisableImg = true;

        //clone image
        imageViewer.innerHTML = '';
        originImage = sourceImage;
        viewerOpen = true;
        clone = sourceImage.cloneNode(true)
        clone.removeAttribute("onclick");
        //add cloned image
        imageViewer.appendChild(clone);

        //determine aspect ratio
        var img = sourceImage.getElementsByTagName('img')[0];
        var imageNode = clone.getElementsByTagName('img')[0];
        var imgHeight = img.height
        var imgWidth = img.width;
        var aspectRatio = imgWidth/imgHeight;

        clone.innerHTML += origInnerHTML;

        //console.log(img.naturalHeight);
        //console.log(window.innerHeight);

        //If very tall image, view with overflow
        if ((aspectRatio < 1.2 && img.naturalHeight > window.innerHeight + 100) || sourceImage.hasAttribute("fullscreen")){
            clone.classList.add("tall");

            //Add scroll container div to keep fullscreen icon at top
            clone.innerHTML = origInnerHTML;
            newDiv = document.createElement("div");
            //newDiv.classList.add("tall");
            newDiv.id = "imgOverlayDivContainer";
            newDiv = clone.appendChild(newDiv);
            newDiv.appendChild(imageNode);

            //TODO: fix background scroll 
            body.classList.add("stop-scrolling");
            mainGrid.classList.add("stop-scrolling");
        } else {
            //Hide fullscreen icons
            var fullScreenIcons = [];
            fullScreenIcons = clone.getElementsByTagName('i');
            fullScreenIcons = Array.prototype.slice.call(fullScreenIcons);

            //console.log(fullScreenIcons);

            fullScreenIcons.forEach(element => {
                if(!element.classList.contains("hidden")) element.classList.add("hidden");
            });

        }
    
        //unhide viewer
        if (imageViewer.classList.contains('hidden')) imageViewer.classList.remove('hidden');

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

        
    }
}


//_____________________________________ Close //
function closeImageViewer() {
    console.log("close");
    viewerOpen = false;
    //hide & clear viewer
    if (!imageViewer.classList.contains('hidden')) imageViewer.classList.add('hidden');
    imageViewer.innerHTML = origInnerHTML;

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
    console.log("expand");
    document.getElementById("fullScreenExpand").classList.add('hidden');
    document.getElementById("fullScreenCompress").classList.remove('hidden');
    document.getElementById("imgOverlayDivContainer").classList.remove('tall');
    item.classList.add("hidden");
}

function compressView(item){
    console.log("compress");
    document.getElementById("fullScreenExpand").classList.remove('hidden');
    document.getElementById("fullScreenCompress").classList.add('hidden');
    document.getElementById("imgOverlayDivContainer").classList.add('tall');
    item.classList.add("hidden");
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
    //console.log(allImages);
    //console.log(imgArray);
    //console.log(originImage);

    var originIndex;

    for (i = 0; i < imgArray.length; i++) {
        if (imgArray[i] === originImage) originIndex = i;
        //console.log(imgArray[i]);
    }

    //console.log(originIndex);
    slideIndex = originIndex;
}

// Next/previous controls
function plusSlides(n) {
    slideIndex += n;
    slideIndex = (slideIndex < 0) ? 0 : slideIndex;
    slideIndex = (slideIndex > imgArray.length-1) ? imgArray.length-1 : slideIndex;

    //console.log(imgArray[slideIndex]);
    //console.log(slideIndex);
    viewImage(imgArray[slideIndex], true);

    
}










function updateArrows() {
    //Place next / prev buttons inside of image if there isn't enough of a margin to the left / right
    var windowWidth = document.body.clientWidth;
    var imgWidth = clone.getBoundingClientRect().width;
    
    //console.log(windowWidth);
    //console.log(imgWidth);

    if (windowWidth - imgWidth < 170) {
        if (!next.classList.contains('flip')) next.classList.add('flip');
        if (!prev.classList.contains('flip')) prev.classList.add('flip');
        if (!closeBtn.classList.contains('flip')) closeBtn.classList.add('flip');
        if (!expand.classList.contains('flip')) expand.classList.add('flip');
        if (!compress.classList.contains('flip')) compress.classList.add('flip');
        //console.log("arrowsInside");
    } else {
        if (next.classList.contains('flip')) next.classList.remove('flip');
        if (prev.classList.contains('flip')) prev.classList.remove('flip');
        if (closeBtn.classList.contains('flip')) closeBtn.classList.remove('flip');
        if (expand.classList.contains('flip')) expand.classList.remove('flip');
        if (compress.classList.contains('flip')) compress.classList.remove('flip');
        //console.log("arrowsOutside");
    }
    next.classList.remove("hidden");
    prev.classList.remove("hidden");
    closeBtn.classList.remove("hidden");
}
  
window.onresize = updateArrows;










function is_touch_enabled() { 
    return ( 'ontouchstart' in window ) ||  
           ( navigator.maxTouchPoints > 0 ) ||  
           ( navigator.msMaxTouchPoints > 0 ); 
} 

if (is_touch_enabled()) imageViewer.classList.add("touchscreen");