///
///////////////////////////////////////////////////////////////// Landing Area Model /////////////////////////////////////
///

//_____________________________________________________________________ DEFINE SCENE
var scene = new THREE.Scene();
var canvas = document.querySelector('#threeModel');
var renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});


//_____________________________________________________________________ PARTICLES _______________________________________________
//_____________________________________________________________________ LOAD MODEL
var mesh;

var loader = new THREE.GLTFLoader();
loader.load( '/assets/models/meOrig.glb', handle_load);

function handle_load(gltf){
	mesh = gltf.scene.children[0];
	scene.add(mesh);

  handle_particles();
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


  scene.add( particles );
}


//_____________________________________________________________________ DEFINE CAMERA
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 4.5;
camera.position.y = 4;
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
    }
    return needResize;
}



//_____________________________________________________________________ Mouse Move Camera Setup

var mouseX = 0, mouseY = 0;

var windowHalfX = (window.innerWidth / 4)*3;
var windowHalfY = window.innerHeight / 2;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

function onDocumentMouseMove( event ) {

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
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
	}


	
	//Render
	renderer.render( scene, camera );
}


animate();


console.log(scene);