//Low Quality Image Placeholders (LQIP) to optimize loading
var images = document.getElementsByTagName("img");

//swap all low res images for high res images once page has loaded
window.addEventListener("load", function () {
  //this appears to be the most reliable way to wait until the page has fully finished loading. If not waiting here,
  //the lqip load process would block the anchor scrolls, such as clicking the down arrow, until all images have finished loading
  swapImages();
});

function swapImages() {
  for (var i = 0; i < images.length; i++) {
    if (!images[i].hasAttribute("lqip-ignore")) {
      var src = images[i].src;

      //remove subdirectory substring
      src = src.replace("lqip/", "");
      if (src.includes("gif")) src = src.replace("gif", "png");
      if (images[i].hasAttribute("lqip-gif")) src = src.replace("jpg", "gif");

      images[i].src = src;
    }
  }
}
