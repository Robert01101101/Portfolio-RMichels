///
///////////////////////////////////////////////////////////////// Animate Landing Area Text /////////////////////////////////////
///

var elements;
var firstText, curText;

//_____________________________________________________________ First Load: get text & start firstLoad()
window.onload = function() {
  elements = document.getElementsByClassName('txt-rotate');
  firstText = elements[0].innerHTML;
  curText = firstText;
  elements[0].innerHTML = '<span class="wrap">'+curText+'</span>';

  var loadDelay = 4000; //<--
  setTimeout(function() {
    firstLoad();
  }, loadDelay);
};

//_____________________________________________________________ Delete Placeholder
function firstLoad() {
  curText = firstText.substring(0, curText.length - 1);

  elements[0].innerHTML = '<span class="wrap">'+curText+'</span>';

  var delta = 150 - Math.random() * 100;

  delta /= 2;

  setTimeout(function() {
    if (curText !== '') {
      firstLoad();
    } else {
      init();
    }
  }, delta);
};

//_____________________________________________________________ Init Animations
function init(){
  console.log("init");
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
}


//https://speckyboy.com/css-javascript-text-animation-snippets/
//_____________________________________________________________ Word Animation Class
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};


//_____________________________________________________________ Tick()
TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 150 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 300;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};