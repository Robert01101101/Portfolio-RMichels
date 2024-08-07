//_____________________________________________________________________ DEFINE SCENE
var scene = new THREE.Scene();
var canvas = document.querySelector('#threeModel');
var renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});//, preserveDrawingBuffer: true}); // SAVE IMAGE
//var tmpImage = document.getElementById('landingModelImage');
var mockupMesh;


//_____________________________________________________________________ VIDEO & LOAD MODEL
// Get the video element
const video = document.getElementById('video');

// Start the video playback programmatically
video.play().catch(function(error) {
    console.error('Error attempting to play the video:', error);
});

// Create a VideoTexture
const videoTexture = new THREE.VideoTexture(video);

// Load the GLTF model
var loader = new THREE.GLTFLoader();
///assets/models/phone.glb
loader.load('/assets/models/hl2_mockup.glb', handle_load);

function handle_load(gltf){
  mockupMesh = gltf.scene.children[0];

  // Traverse the model to find the "screen" material
  mockupMesh.traverse(function (node) {
    if (node.isMesh)console.log(node.material.name);
    if (node.isMesh && node.material.name === 'screen') {
        // Apply the video texture to the "screen" material
        /*node.material = new THREE.MeshBasicMaterial({
            map: videoTexture,
        });*/
        node.material.blending = THREE.NormalBlending;
        node.material.needsUpdate = true;
    }
  });

  scene.add(mockupMesh);
  //mockupMesh.position.x = 0.4;
  mockupMesh.position.y = -1.5;
  mockupMesh.rotation.x += Math.PI / 32;
  //mockupMesh.rotation.z = Math.PI / 2;
}



//_____________________________________________________________________ DEFINE CAMERA
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 0;
camera.position.y = 0;
camera.rotation.x = 0;


//_____________________________________________________________________ DEFINE LIGHTING
var ambientLight = new THREE.AmbientLight( 0xffffff , 3); // soft white light
var light = new THREE.PointLight( 0x909090, 3 );
light.position.set( -6, 10, 5 );
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
      camera.position.z = 
        (window.innerWidth > xxxxlBreakPoint) ? 
        20 - (xxxxlBreakPoint / smBreakPoint)*4 : 
        (window.innerWidth > mdBreakPoint) ? 
        20 - (window.innerWidth / smBreakPoint)*4 : 
        10;
      if (mockupMesh) mockupMesh.position.x = (window.innerWidth > mdBreakPoint) ? 0.4 : 0;
    }
    return needResize;
}



//_____________________________________________________________________ Mouse Move Camera Setup

var mouseX = 0, mouseY = 0;

var windowHalfX = (window.innerWidth < xlBreakPoint) ? (window.innerWidth / 2) : (window.innerWidth / 4)*3;
var windowHalfY = window.innerHeight / 4;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

function onDocumentMouseMove( event ) {

  mouseX = (windowHalfX - event.clientX)/1000;
  mouseY = (windowHalfY - event.clientY)/1000;

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
    camera.position.x += ((window.innerWidth > mdBreakPoint) ? -.15 : 0) + ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
	}


	
	//Render
	renderer.render( scene, camera );
}


animate();


