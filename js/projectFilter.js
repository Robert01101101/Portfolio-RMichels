
//store all active filters (for multiple filters)
var activeFilters = new Array();
var andActive = false;


//
//Find all Filter Buttons, send events on toggle with data attached (slug, toggle), sort projects after click
//
document.querySelectorAll('.filterBtn').forEach(item => {
    var toggle = false;
    const slug = item.dataset.js;

    item.addEventListener('click', event => {

      //toggle button style
      item.classList.toggle("filterBtn--selected");

      //toggle filter state
      toggle = !toggle;
      if (toggle) {
        //add item to array
        activeFilters.push(slug)
      } else {
        //remove item from array
        const index = activeFilters.indexOf(slug);
        if (index > -1) {
          activeFilters.splice(index, 1);
        }
      }

      console.log(activeFilters.length);

      //update projects
      document.dispatchEvent(new CustomEvent('updateProject', { bubbles: true, detail: { slug: () => slug, toggle: () => toggle } }))

      setTimeout(() => { sortProjects(); }, 10);

    })
})


//
//update project visibility on event
//
const projRows = document.querySelectorAll('.projRow');
const hiddenDiv = document.getElementById('projectTileHidden');
const visibleDiv = document.getElementById('projectTileVisible');

var counter = 0;

projRows.forEach(item => {

  const roles = item.dataset.js.split(',');
  var position = counter;
  item.setAttribute('data-tile', position);
  counter++;

  addEventListener('updateProject', function (e) { //-----toggle project tile on event

    //check whether any of the active filters match
    var active = false;
    var missedHit = false;
    if (activeFilters.length > 0){
      activeFilters.forEach(element => {
        if (roles.includes(element)) {
          active = true;
        } else if (andActive){
          //for "and" case
          missedHit = true;
        }
      });
    } else {
      active = true;
    }
    //for "and" case
    if (missedHit) active = false;

    if (active){ //if (!roles.includes(e.detail.slug())){
      //show
      if (item.classList.contains("projRow--hidden")) item.classList.remove("projRow--hidden");
      visibleDiv.appendChild(item);

    } else {
      //hide
      if (!item.classList.contains("projRow--hidden")) item.classList.add("projRow--hidden");
      hiddenDiv.appendChild(item);

    }
  });
})


const projectCount = document.getElementById('projectCount');
//
//sort projects manually to ensure the order is the same
//
function sortProjects() {

  var items = visibleDiv.childNodes;
  var itemsArr = [];
  for (var i in items) {
      if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
          itemsArr.push(items[i]);
      }
  }

  projectCount.innerHTML = itemsArr.length;

  itemsArr.sort(function(a, b) {
    return a.dataset.tile == b.dataset.tile
            ? 0
            : (a.dataset.tile > b.dataset.tile ? 1 : -1);
  });

  for (i = 0; i < itemsArr.length; ++i) {
    visibleDiv.appendChild(itemsArr[i]);
  }
}



//
// Handle Checkbox
//
var checkbox = document.getElementById('and_or_switch');

checkbox.addEventListener('change', function() {
  andActive = this.checked;

  console.log(andActive);

  //update projects
  document.dispatchEvent(new CustomEvent('updateProject', { bubbles: true, detail: { slug: () => slug, toggle: () => toggle } }))

  setTimeout(() => { sortProjects(); }, 10);
});