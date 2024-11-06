///
///////////////////////////////////////////////////////////////// Landing Area Model /////////////////////////////////////
///

//_____________________________________________________________________ DEFINE SCENE
var scene = new THREE.Scene();
var canvas = document.querySelector('#threeModel');
var renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});//, preserveDrawingBuffer: true}); // SAVE IMAGE
var tmpImage = document.getElementById('landingModelImage');
var tmpSpinner = document.getElementById('spinner');
var doneLoading = false;
var lowPoweredDevice = false;

//_____________________________________________________________________ LOAD MODEL
//show spinner after 100ms if model hasn't finished loading
setTimeout(function(){
  if(!doneLoading && !lowPoweredDevice){
    tmpSpinner.style.display = "";
  }
}, 300);

var mesh;
var loader = new THREE.GLTFLoader();

function isLowPoweredDevice() {
  // Check the number of logical processors
  const cores = navigator.hardwareConcurrency || 2; // Default to 1 if not available
  if (cores <= 2) {
      lowPoweredDevice = true;
      return true; // Likely a low-powered device
  }

  // Check user agent for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipod/.test(userAgent);
  if (isMobile) {
      lowPoweredDevice = true;
      return true; // Mobile devices are often low-powered
  }

  // Additional checks can be added here (e.g., specific device models)

  return false; // Assume it's not a low-powered device
}

// Check if the device is low-powered before loading the model
if (isLowPoweredDevice()) {
  console.warn("Low-powered device detected. Aborting model load.");
  // Optionally, show a message to the user or load a simpler model
} else {
  loader.load('/assets/models/me_v2.glb', handle_load);
}

function handle_load(gltf){
  mesh = gltf.scene.children[0];

  scene.add(mesh);

  handle_particles();

  showCanvasAfterFirstRenderToPreventWhiteFlash();
}


//_____________________________________________________________________ SET UP PARTICLES
function handle_particles(){
  var particles;

  // Define Positions
  var pointGeo = new THREE.BufferGeometry();
  pointGeo.copy(mesh.geometry);
  //console.log(pointGeo);
  //console.log(pointGeo.getAttribute("position"));

  // Define Scales
  var scales = new Float32Array( pointGeo.getAttribute("position").count );
  var i;
  for (i = 0; i < scales.length; i++) {
    scales[i] = .05;
  }
  pointGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));


  /////// Define Geometry
  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(pointGeo, 3));
  geometry.setAttribute( 'scale', new THREE.BufferAttribute(scales, 10) );


  /////// Define Material
  var material = new THREE.ShaderMaterial( {

    uniforms: {
      color: { value: new THREE.Color( 0xffffff ) },
    },
    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent

  } );


  ////// Init
  particles = new THREE.Points( pointGeo, material );
  //apply transforms
  particles.scale.copy(mesh.scale);
  particles.rotation.copy(mesh.rotation);
  particles.position.copy(mesh.position);

  scene.add( particles );
}


//_____________________________________________________________________ DEFINE CAMERA
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = (window.innerWidth > smBreakPoint) ? 11 : 15;
camera.position.y = 0;
camera.rotation.x = -Math.PI / 5;


//_____________________________________________________________________ DEFINE LIGHTING
var ambientLight = new THREE.AmbientLight( 0xffffff ); // soft white light
var light = new THREE.PointLight( 0x909090, 1 );
light.position.set( -6, 7, 6 );
scene.add( ambientLight );
scene.add(light);



//_____________________________________________________________________ INIT RENDERER
renderer.render( scene, camera );

//RESPONSIVE, RESIZE ON SCREEN SIZE CHANGE, ADJUST FOR PPI
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);

      //update query specific styling
      windowHalfX = (window.innerWidth < xlBreakPoint) ? (window.innerWidth / 2) : (window.innerWidth / 4)*3;
      camera.position.z = (window.innerWidth > smBreakPoint) ? 11 : 15;
    }
    return needResize;
}



//_____________________________________________________________________ Mouse Move Camera Setup

var mouseX = 0, mouseY = 0;

var windowHalfX = (window.innerWidth < xlBreakPoint) ? (window.innerWidth / 2) : (window.innerWidth / 4)*3;
var windowHalfY = window.innerHeight / 4;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

function onDocumentMouseMove( event ) {
  if (!doneLoading) return;

  mouseX = (windowHalfX - event.clientX)/230;
  mouseY = (windowHalfY - event.clientY)/230;
}


//_____________________________________________________________________ RENDERER & ANIMATE
function animate() {
	requestAnimationFrame( animate );


	if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

	/////////////////////////////Animate (only if mesh assigned)
	if (camera){
		//camera.position.y -= 0.002;
    camera.position.x += ( mouseX - camera.position.x ) * .015;
    camera.position.y += ( - mouseY - camera.position.y ) * .015;
    camera.lookAt( scene.position );
	}

	//Render
	renderer.render( scene, camera );
}

animate();


function showCanvasAfterFirstRenderToPreventWhiteFlash() {
  renderer.render(scene, camera);
  renderer.setClearColor(0x000000, 0);
  
  let frames = 0;
  //wait for frames to load, this seems to work best to prevent white flash
  //but it's still not really what I want as it doesn't work every time
  //and adds unneccessary delay
  function waitFrames() {
    frames++;
    renderer.render(scene, camera);
    if (frames < 20) {
      requestAnimationFrame(waitFrames);
    } else if (frames < 21){
      canvas.style.display = '';
      requestAnimationFrame(waitFrames);
    } else if (frames < 22) {
      canvas.style.visibility = 'visible';
      requestAnimationFrame(waitFrames);
    } else {
      tmpImage.style.display = "none";
      tmpSpinner.style.display = "none";
      doneLoading = true;
    }
  }
  requestAnimationFrame(waitFrames);
}






// Handle Crashes
canvas.addEventListener('webglcontextlost', function(event) {
    event.preventDefault(); // Prevent the default behavior (which is to stop rendering)
    console.log("WebGL context lost!");

    canvas.style.display = "none";
    tmpImage.style.display = "";
    // Handle the context loss (e.g., show a message, attempt to recover, etc.)
}, false);

canvas.addEventListener('webglcontextrestored', function(event) {
  console.log("WebGL context restored!");

  canvas.style.display = "";
  tmpImage.style.display = "none";
  // Handle the context loss (e.g., show a message, attempt to recover, etc.)
}, false);


//// DEV
/*
setTimeout(() => { 
  var screenshot = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");; 
  console.log(screenshot); 
  window.location.href=screenshot;  
}, 2000);*/

//setTimeout(() => renderer.forceContextLoss(), 2000); // Simulate crash after 5 seconds
//setTimeout(() => renderer.forceContextRestore(), 3000); // Simulate crash after 5 seconds