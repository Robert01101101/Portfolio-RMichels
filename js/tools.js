///
///////////////////////////////////////////////////////////////// General Purpose Tools /////////////////////////////////////
///


//_____________________________________________________________ map Value from source to target range
function mapVal (num, in_min, in_max, out_min, out_max)  {
	return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function clamp (num, min, max)   {
  return num <= min ? min : num >= max ? max : num;
}

//_____________________________________________________________________________________________________________________________________
//find window Y limit
function calcDocHeight() {
  var docHeightBody = document.body,
		html = document.documentElement;

  docHeight = Math.max( docHeightBody.scrollHeight, docHeightBody.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight );

  console.log("docHeight: " + docHeight);

  return docHeight;
}

var docHeight = calcDocHeight();

const xlBreakPoint = 1200;
const smBreakPoint = 576;