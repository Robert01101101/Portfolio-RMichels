//_____________________________________________________________________ DEFINE SCENE
var scene = new THREE.Scene();
var canvas = document.querySelector('#threeModel');
var renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;



//_____________________________________________________________________ LOAD MODEL
var mesh;

var loader = new THREE.GLTFLoader();
loader.load( 'http://www.sfu.ca/~rmichels/3Dmodels/Joystick.glb', handle_load);

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
light.castShadow = true; 
light.shadow.mapSize.set(16384,16384);
light.shadow.radius = 30;
light.shadow.bias = -0.0001;
light.shadow.mapSize.width = 1024*4;
light.shadow.mapSize.height = 1024*4;
scene.add( ambientLight );
scene.add(light);


//_____________________________________________________________________ Add Shadow Plane

var geometry = new THREE.PlaneBufferGeometry( 10, 10 );
//var material = new THREE.MeshStandardMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var material = new THREE.ShadowMaterial({side: THREE.DoubleSide});
material.opacity = .5;
var plane = new THREE.Mesh( geometry, material );
plane.receiveShadow = true;
plane.position.y = -.1;
plane.rotation.x = Math.PI / 2;
scene.add(plane);




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
		mesh.rotation.y += 0.002;
	}
	
	//Render
	renderer.render( scene, camera );
}





animate();


console.log(scene);