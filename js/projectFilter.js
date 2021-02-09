//
//Find all Filter Buttons, send events on toggle with data attached (slug, toggle), sort projects after click
//
document.querySelectorAll('.filterBtn').forEach(item => {
    var toggle = false;
    const slug = item.dataset.js;

    item.addEventListener('click', event => {

      //toggle button style
      item.classList.toggle("filterBtn--selected");

      toggle = !toggle;
      
      //toggle project visibility
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
    if (!roles.includes(e.detail.slug())){
      //matches
      item.classList.toggle("projRow--visible");
      if (e.detail.toggle()) {
        hiddenDiv.appendChild(item);
      } else {
        visibleDiv.appendChild(item);
      }
      
      //console.log(e.detail.toggle());
    } /*else {
      

      item.style.order=position;
    }*/
  });
})


const projectCount = document.getElementById('projectCount');
//
//dort projects manually to ensure the order is the same
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