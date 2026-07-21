// get list of all spans
list = document.querySelectorAll('h2');
for (var i=0; i<list.length; i++) {
  // retrieve width of span and apply it to parent
  w = list[i].offsetWidth;
  list[i].parentNode.style.width = w+1+"px"; // need to add 1 because sometimes width is not a whole number and Browser sometimes rounds it down which will trigger layout shift
}

console.log(list);