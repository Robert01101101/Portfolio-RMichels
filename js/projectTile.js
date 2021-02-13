///
///////////////////////////////////////////////////////////////// yOffset Project Tile Labels /////////////////////////////////////
///

function offset(el) {
    var rect = el.getBoundingClientRect();
    return rect.top;
}

var projLabel = document.querySelectorAll(".projLabel");
var projMeta = document.querySelectorAll(".projMeta");
var projJScontainer = document.querySelectorAll(".projJScontainer");

window.onscroll = function (e) {
	var buffer = 50;
	var min = -80;
	var max = 100;
	var elementsToOffset = projLabel;

	//mobile
	if (window.innerWidth < xlBreakPoint){
		min = -40;
		max = 0;
		var elementsToOffset = projJScontainer;
	}

	var i;
	for (i = 0; i < elementsToOffset.length; i++) {
		var curElement = elementsToOffset[i];
		var yPos = offset(curElement);
		

		curElement.style.bottom = clamp(mapVal(yPos, 0, window.innerHeight, max, min), min-buffer, max+buffer) + 'px';

		//console.log("yPos=" + yPos);
		//console.log("bottom=" + curElement.style.bottom);
		//console.log("window height=" + window.innerHeight);
	}

	
}

//TODO: update on resize