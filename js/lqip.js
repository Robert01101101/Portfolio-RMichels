
//Low Quality Image Placeholders (LQIP) to optimize loading
var images = document.getElementsByTagName('img'); 


//swap all low res images for high res images
for(var i = 0; i < images.length; i++) {

    if (!images[i].hasAttribute("ignoreLQIP")){
        var src = images[i].src;

        //remove subdirectory substring
        src = src.replace('lqip/','');
        if (src.includes("gif")) src = src.replace('gif','png');

        images[i].src = src;
    }
}