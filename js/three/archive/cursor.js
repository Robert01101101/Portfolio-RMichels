//_____________________________________________________________________ CURSOR _______________________________________________
function initCursor() {
	var container;
	var camera, scene, renderer;
	var cube;

	init();
	animate();

	function init () {
		container = document.createElement( 'div' );
		container.classList.add('cursor');
		document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1005 );
		camera.position.z = 2;

		scene = new THREE.Scene();

		var geometry = new THREE.BoxGeometry( .1, .1, .03 );
		var material = new THREE.MeshLambertMaterial( { color: 0x228C8C } );
		cube = new THREE.Mesh( geometry, material );
		scene.add( cube );
		cube.position.set(0, 0, 0);

		//_____________________________________________________________________ DEFINE LIGHTING
		var ambientLight = new THREE.AmbientLight( 0xffffff ); // soft white light
		var light = new THREE.PointLight( 0x909090, 1 );
		light.position.set( -6, 7, 6 );
		scene.add( ambientLight );
		scene.add(light);

		//_____________________________________________________________________ INIT RENDERER
		renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );
	}

	//_____________________________________________________________________ Mouse Move Camera Setup

	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	function onDocumentMouseMove( event ) {

	  mouseX = (windowHalfX - event.clientX)/230;
	  mouseY = (windowHalfY - event.clientY)/230;

	}

	function animate() {

		requestAnimationFrame( animate );

		render();
	}

	function render() {

		/////////////////////////////Animate (only if mesh assigned)
		if (cube){
		    cube.position.x = -mouseX;
		    cube.position.y = mouseY;
		    camera.lookAt( scene.position );
		}

		renderer.render( scene, camera );

	}

	
}

initCursor();