//_____________________________________________________________________ DEFINE SCENE
var scene = new THREE.Scene();
var canvas = document.querySelector('#threeModel');
var renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});



//_____________________________________________________________________ LOAD MODEL
var mesh;

var loader = new THREE.GLTFLoader();
loader.load( 'http://www.sfu.ca/~rmichels/3Dassets/models/meOrig.glb', handle_load);

function handle_load(gltf){
	mesh = gltf.scene.children[0];
	mesh.traverse(function(child){child.castShadow = true;});
	scene.add(mesh);
}

//_____________________________________________________________________ DEFINE CAMERA
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 3;
camera.position.y = 4;
camera.rotation.x = -Math.PI / 4;


//_____________________________________________________________________ DEFINE LIGHTING
var ambientLight = new THREE.AmbientLight( 0x707070 ); // soft white light
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



//_____________________________________________________________________ RENDERER & ANIMATE
//Render Scene
function animate() {
	requestAnimationFrame( animate );

	if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

	//Animate (only if mesh assigned)
	if (mesh){
		mesh.rotation.z += 0.002;
	}
	
	//Render
	renderer.render( scene, camera );
}





animate();


console.log(scene);