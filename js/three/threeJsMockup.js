//_____________________________________________________________________ DEFINE SCENE
var scene = new THREE.Scene();
var canvas = document.querySelector('#threeModel');
var renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});//, preserveDrawingBuffer: true}); // SAVE IMAGE
//var tmpImage = document.getElementById('landingModelImage');
var mockupMesh;
var initialMockupMeshRotation;
var isPhone = canvas.hasAttribute('mockup-phone');
const spinner = document.getElementById('spinner');
var origHololensPosition;
var hololens;


//_____________________________________________________________________ VIDEO & LOAD MODEL
// Get the video element
const video = document.getElementById('video');
var videoTexture;

// Start the video playback programmatically
if (video){
  video.play().catch(function(error) {
      console.error('Error attempting to play the video:', error);
  });
  // Create a VideoTexture
  videoTexture = new THREE.VideoTexture(video);
}

function hideSpinner() {
  if (!spinner) return;
  spinner.style.display = 'none';
  canvas.style.display = 'block';
}



// Load the GLTF model
var loader = new THREE.GLTFLoader();
///assets/models/phone.glb
var path = isPhone ? '/assets/models/phone.glb' : '/assets/models/hlAndBridgeCombined.glb';
loader.load(path, handle_load);

function handle_load(gltf){
  mockupMesh = gltf.scene.children[0];
  initialMockupMeshRotation = mockupMesh.rotation.clone();

  var raysMeshToRemove = [];

  // Traverse the model to find the "screen" material
  mockupMesh.traverse(function (node) {
    //console.log(node.name);
    if (node.name === 'Hololens'){
      
      //TODO: fix, not working as expected, seems to have no effect?
      origHololensPosition = new THREE.Vector3(node.position.x, node.position.y, node.position.z);
      //console.log('Hololens found');
      hololens = node;
    }
    if (node.name.includes('Ray')){
      // Access the geometry of the mesh
      const geometry = node.geometry;

      // Retrieve the position attribute from the geometry
      const positionAttribute = geometry.getAttribute('position');

      // Get the positions of vertices 0 and 1
      const vertex0 = new THREE.Vector3().fromBufferAttribute(positionAttribute, 0);
      const vertex1 = new THREE.Vector3().fromBufferAttribute(positionAttribute, 1);

      //console.log('Vertex 0:', vertex0);
      //console.log('Vertex 1:', vertex1);
      createLine(vertex0, vertex1);
      
      raysMeshToRemove.push(node);
    }
    if (node.isMesh) {
      if (node.material.name === 'Hologram'){
        node.material.emissive  = new THREE.Color(0x555577);
        holograms.push(node);
      }
      if (isPhone && node.material.name === 'screen'){
        // Apply the video texture to the "screen" material
        node.material = new THREE.MeshBasicMaterial({
          map: videoTexture,
        });
      } else {
        //TODO: get transparency working? Or get a jpg texture working for albedo to optimize?
        node.material.blending = THREE.NormalBlending;
      }
      node.material.needsUpdate = true;
    }
  });
  holograms.forEach(hologram => {
    hololens.attach(hologram);
  });

  if (raysMeshToRemove) raysMeshToRemove.forEach(rayMesh => mockupMesh.remove(rayMesh));

  scene.add(mockupMesh);
  if (isPhone) {
    mockupMesh.position.x = 0.4;
  } else {
    //mockupMesh.rotation.x += Math.PI / 16;
  }
  hideSpinner();
}







var holograms = [];
var rays = [];

// Vertex shader
const vertexShader = `
  attribute float distanceAlongLine;
  varying float vDistance;

  void main() {
    vDistance = distanceAlongLine;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader
const fragmentShader = `
  varying float vDistance;

  uniform float startFadeIn;
  uniform float startSolid;
  uniform float endSolid;
  uniform float endFadeOut;
  uniform float maxAlpha;
  uniform vec3 color; // Base color
  uniform vec3 emissiveColor; // New uniform for emissive color

  void main() {
    float alpha = 0.0;
    if (vDistance < startFadeIn) {
      alpha = 0.0;
    } else if (vDistance < startSolid) {
      alpha = maxAlpha * (vDistance - startFadeIn) / (startSolid - startFadeIn);
    } else if (vDistance < endSolid) {
      alpha = maxAlpha;
    } else if (vDistance < endFadeOut) {
      alpha = maxAlpha * (1.0 - (vDistance - endSolid) / (endFadeOut - endSolid));
    } else {
      alpha = 0.0;
    }
    vec3 finalColor = mix(color, emissiveColor, alpha); // Mix between base and emissive color
    gl_FragColor = vec4(finalColor, alpha); // Use the final color with varying alpha
  }
`;

function createLine(startPoint, endPoint) {
  // Define the points
  const points = [];
  points.push(startPoint); // Starting point
  points.push(endPoint); // Ending point

  // Create the geometry and set the points
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // Calculate distances along the line
  const distanceAlongLine = new Float32Array([0, 1]);
  geometry.setAttribute('distanceAlongLine', new THREE.BufferAttribute(distanceAlongLine, 1));

  // Create the custom shader material with transparency enabled
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    uniforms: {
      startFadeIn: { value: 0.15 },
      startSolid: { value: 0.5 },
      endSolid: { value: 0.55 },
      endFadeOut: { value: 0.95 },
      maxAlpha: { value: 1 },
      color: { value: new THREE.Color(.7,.7,1) }, // Set the base color
      emissiveColor: { value: new THREE.Color(.6,.6,1) } // Emissive color
    }
  });

  // Create the line
  const line = new THREE.Line(geometry, material);
  //console.log('Added line with positions:', startPoint, endPoint);
  rays.push(line);
  mockupMesh.attach(line);
  //scene.add(line);
}



//_____________________________________________________________________ DEFINE CAMERA
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 0;
camera.position.y = 0;
camera.rotation.x = 0;


//_____________________________________________________________________ DEFINE LIGHTING
var ambientLight = isPhone ? new THREE.AmbientLight( 0xffffff) : new THREE.AmbientLight( 0xffffff , 3); // soft white light
var light = isPhone ? new THREE.PointLight( 0x909090, .3 ) : new THREE.PointLight( 0x909090, 1 );
if (isPhone){
  light.position.set( -6, 7, 6 );
} else {
  light.position.set( -2, 10, 8 );
}
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
        (isPhone ? 20 : 22) - (xxxxlBreakPoint / smBreakPoint)* (isPhone ? 2.3 :  0.85) : 
        (window.innerWidth > mdBreakPoint || !isPhone) ? 
        (isPhone ? 20 : 22) - (window.innerWidth / smBreakPoint)*(isPhone ? 2.3 : 0.85) : 
        10;
      if (mockupMesh && isPhone) mockupMesh.position.x = (window.innerWidth > mdBreakPoint) ? 0.4 : 0;
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
	if (camera && scene){
		//camera.position.y -= 0.002;
    var xShift = isPhone ? ((window.innerWidth > mdBreakPoint) ? .05 : 0) : -.02;
    var timeShift = Date.now() * 0.0005;
    camera.position.x += xShift + ( mouseX+(Math.sin(timeShift)/2) - camera.position.x ) * (isPhone ? .05 : .03);
    camera.position.y += ( - mouseY - camera.position.y ) * (isPhone ? .03 : 0.1) + (isPhone ? 0 : 0.2);
    var target = new THREE.Vector3(scene.position.x, scene.position.y, scene.position.z);
    if (!isPhone){
      target.y += 7.5;
      target.x -= 1.5;
    }
    camera.lookAt(target);
	}

  

  // Update maxAlpha for each ray based on camera position
  var lastValue;
  rays.forEach((ray, index) => {
    // Use perlin noise to generate alpha value based on camera position
    const noiseValue = perlin.get((camera.position.x * .4 + index/5 + timeShift)/2, (camera.position.y * .4)/2)*.8; // Adjust the scale as needed
    ray.material.uniforms.maxAlpha.value = noiseValue; // Ensure it stays between 0 and 1
    lastValue = ray.material.uniforms.maxAlpha.value;
  });

  const startColor = new THREE.Color(0x404055);
  const endColor = new THREE.Color(0xaaaacc);
  const emissiveColor = startColor.clone().lerp(endColor, lastValue);
  var hlTimeOffset = Math.sin(Date.now() * 0.001) * 3;
  //var i = 1;
  holograms.forEach(hologram => {
    // Use perlin noise to generate alpha value based on camera position
    hologram.material.emissive = emissiveColor;
  });

  

  if (hololens){
    hololens.position.z = origHololensPosition.z + hlTimeOffset;
    hololens.position.x = origHololensPosition.x - mouseX/200;
  }

	//Render
	renderer.render( scene, camera );
}



animate();






//_____________ FLICKER
// Function to initialize Perlin noise
function initializePerlin() {
  perlin.seed(Math.random()); // Seed the noise generator
}

// Call this function once to initialize Perlin noise
initializePerlin();




//_____________ SCROLL
window.addEventListener('load', () => {
  if (window.locoScroll) {
    window.locoScroll.on('scroll', (args) => {
      scrollUpdate(args.scroll);
    });
  }
});
function scrollUpdate(ev) {
  if (ev == null) return;
  const scrollY = ev.y || window.scrollY;
  if (canvas){
    // Get the bounding client rect of the canvas
    const canvasRect = canvas.getBoundingClientRect();
    // Calculate the scroll position relative to the scroll container
    const canvasScrollTop = canvasRect.top + scrollY - canvas.height/6;
    const diff = scrollY - canvasScrollTop;
    const scaledDiff = quadraticTransform(diff / (isPhone ? 1200 : 2000));//1200);
    //console.log('difference', scrollY - canvasScrollTop);
    mockupMesh.rotation.y = initialMockupMeshRotation.y + scaledDiff;
  }
}

function quadraticTransform(value) {
  const sign = value >= 0 ? 1 : -1; // Preserve the sign of the input
  return sign * Math.pow(value, 2);
}