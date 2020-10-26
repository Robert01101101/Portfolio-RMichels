//_________________________________________________________________________________________ General Purpose Tools

//_____________________________________________________________ map Value from source to target range
const mapVal = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

//_____________________________________________________________________________________________________________________________________
//find window Y limit
var scrollLimit = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
console.log("limit: " + scrollLimit);