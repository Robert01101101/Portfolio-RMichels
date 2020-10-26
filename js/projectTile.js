function offset(el) {
    var rect = el.getBoundingClientRect();
    return rect.top;
}

var projLabel = document.querySelectorAll(".projLabel");

window.onscroll = function (e) {
	var i;
	for (i = 0; i < projLabel.length; i++) {
		var curLabel = projLabel[i];
		curLabel.style.bottom = mapVal(offset(curLabel), 0, window.innerHeight, 100, -80) + 'px';

		console.log("yPos=" + offset(curLabel));
		console.log("window height=" + window.innerHeight);
	}

	
}

//TODO: update on resize