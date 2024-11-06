///
///////////////////////////////////////////////////////////////// Footer Particle Waves /////////////////////////////////////
///

function waves () {

	var SEPARATION = 160, AMOUNTX = 180, AMOUNTY = 40;

	var container;
	var camera, scene, renderer;

	var particles, count = 0;

	var mouseX = 0, mouseY = 0;

	var canvas;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	init();

	function init() {

		container = document.createElement( 'div' );
		container.classList.add('waves');
		document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 3500;
		camera.position.y = (docHeight - 200 - window.scrollY)*10;

		scene = new THREE.Scene();

		//

		var numParticles = AMOUNTX * AMOUNTY;

		var positions = new Float32Array( numParticles * 3 );
		var scales = new Float32Array( numParticles );

		var i = 0, j = 0;

		for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

			for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

				positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
				positions[ i + 1 ] = 0; // y
				positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z

				scales[ j ] = 1;

				i += 3;
				j ++;

			}

		}

		var geometry = new THREE.BufferGeometry();
		geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
		geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

		var material = new THREE.ShaderMaterial( {

			uniforms: {
				color: { value: new THREE.Color( 0x666666 ) }
			},
			vertexShader: document.getElementById( 'vertexshader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentshader' ).textContent

		} );

		//

		particles = new THREE.Points( geometry, material );
		scene.add( particles );


		//
		//_____________________________________________________________________ INIT RENDERER
		renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
		canvas = renderer.domElement;
		canvas.style.visibility = 'hidden';
		canvas.classList.add('wavesCanvas');
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( canvas );

		

		//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		//document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		//window.addEventListener("scroll", updateCamera);
		//
		window.addEventListener('load', () => {
			if (window.lenis) {
			  window.lenis.on('scroll', (args) => {
				updateCamera(args);
			  });
			}
		});

		window.addEventListener( 'resize', onWindowResize, false );

	}

	//_________________________________________ on Scroll
	function updateCamera(ev) {
		if (ev == null) return;
		const scrollY = ev.animatedScroll;
		camera.position.y = (docHeight - scrollY + 100);

	    //camera.position.y = (docHeight - window.scrollY) ;//+ 100;
	    //console.log("scroll: " + window.scrollY);
		
	    var newCol = mapVal(scrollY, 0, docHeight, 0.13, .38);
	    if (newCol < 0.13) newCol = 0.13;
	    particles.material.uniforms.color = { type: "c", value: { r:newCol, g:newCol, b:newCol } };
			



	    /*
	    particles.material.uniforms.opacity = { value: 0 };
		particles.material.transparent = true;
		particles.material.blendEquation = 10;
	    particles.material.opacity = .1;
	    //gl_FragColor = vec4( color, 1.0 );
	    console.log(particles.material);*/

		//console.log("update camera. docHeight = " + docHeight + ", window.scrollY = " + window.scrollY);
	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		//update page height
		calcDocHeight();

		console.log("resize");
	}

	//

	/*
	function onDocumentMouseMove( event ) {

		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;

	}

	function onDocumentTouchStart( event ) {

		if ( event.touches.length === 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;

		}

	}

	function onDocumentTouchMove( event ) {

		if ( event.touches.length === 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;

		}

	}*/

	//

	//___________________________________________________ Custom addition: raycasting to track mouse
	/*
	const raycaster = new THREE.Raycaster();
	raycaster.params.Points.threshold = 5;
	const mouse = new THREE.Vector2();

	function onMouseMove( event ) {

		// calculate mouse position in normalized device coordinates
		// (-1 to +1) for both components
	
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	}

	function renderRaycast() {
		// update the picking ray with the camera and mouse position
		raycaster.setFromCamera( mouse, camera );

		// calculate objects intersecting the picking ray
		const intersects = raycaster.intersectObjects( scene.children );


		for ( let i = 0; i < intersects.length; i ++ ) {
			//.object.material.color.set( 0xff0000 );
			console.log("hit: "); 
			console.log(intersects[ i ].object);
			intersects[ i ].object.material.uniforms.color = { type: "c", value: { r:1, g:0, b:0 } };
		}
	}

	window.addEventListener( 'mousemove', onMouseMove, false );*/







	

	function animate() {

		requestAnimationFrame( animate );

		//_________________________________________________________________ Not included in orig script, copied from landingModel.js
		/*
		if (resizeRendererToDisplaySize(renderer)) {
	      const canvas = renderer.domElement;
	      camera.aspect = canvas.clientWidth / canvas.clientHeight;
	      camera.updateProjectionMatrix();
	    }
		*/
		render();
	}

	function render() {

		var positions = particles.geometry.attributes.position.array;
		var scales = particles.geometry.attributes.scale.array;

		var i = 0, j = 0;

		for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

			for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

				positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 200 ) +
								( Math.sin( ( iy + count ) * 0.5 ) * 100 );

				scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 8 +
								( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 1;

				i += 3;
				j ++;

			}

		}

		particles.geometry.attributes.position.needsUpdate = true;
		particles.geometry.attributes.scale.needsUpdate = true;

		//renderRaycast();

		renderer.render( scene, camera );

		count += 0.02;

	}

	//_________________________________________________________________ Not included in orig script, copied from landingModel.js
	//RESPONSIVE, RESIZE ON SCREEN SIZE CHANGE, ADJUST FOR PPI
	/*
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
	*/

	//console.log(scene);

	updateCamera();

	function refreshWindow() {
		calcDocHeight(); updateCamera();
	}

	refreshWindow();
	setTimeout(refreshWindow, 500);

	//detect page finish loading
	document.DOMContentLoaded = () => {
		if (document.readyState === 'interactive') {
			// document ready
			//console.log("page finished loading");
		
			//TODO: Fix proper detection of page load finish. Due to
			// 		complications with image loading, page load detection is currently
			//		not 100% accurate, so this helps deal with that for now
			for (let i = 0; i < 16; i++) {
				setTimeout(refreshWindow, (50+Math.pow(4, (i/2)+1)/10));
			}
		}

		if (typeof initProjectTiles !== "undefined") { 
			initProjectTiles();
		}
	};

	animate();

	showCanvasAfterFirstRenderToPreventWhiteFlash();

	function showCanvasAfterFirstRenderToPreventWhiteFlash() {
		renderer.render(scene, camera);
		renderer.setClearColor(0x000000, 0);
		
		let frames = 0;
		function waitFrames() {
			renderer.render(scene, camera);
			if (frames++ < 15) {
				requestAnimationFrame(waitFrames);
			} else {
				//console.log('show canvas');
				canvas.style.visibility = 'visible';
			}
		}
		requestAnimationFrame(waitFrames);
	}

	// Handle Crashes
	canvas.addEventListener('webglcontextlost', function(event) {
		event.preventDefault(); // Prevent the default behavior (which is to stop rendering)
		console.log("WebGL context lost!");

		canvas.style.display = "none";
	}, false);

	canvas.addEventListener('webglcontextrestored', function(event) {
		console.log("WebGL context restored!");

		canvas.style.display = "";
	}, false);


	//// DEV
	//setTimeout(() => renderer.forceContextLoss(), 2000); // Simulate crash after 5 seconds
	//setTimeout(() => renderer.forceContextRestore(), 3000); // Simulate crash after 5 seconds
}

function isLowPoweredDeviceWaves() {
	// Check the number of logical processors
	const cores = navigator.hardwareConcurrency || 2; // Default to 1 if not available
	if (cores <= 2) {
		return true; // Likely a low-powered device
	}
  
	// Check user agent for mobile devices
	const userAgent = navigator.userAgent.toLowerCase();
	const isMobile = /mobile|android|iphone|ipod/.test(userAgent);
	if (isMobile) {
		return true; // Mobile devices are often low-powered
	}
  
	// Additional checks can be added here (e.g., specific device models)
  
	return false; // Assume it's not a low-powered device
  }

  // Check if the device is low-powered before loading the model
if (isLowPoweredDeviceWaves()) {
	console.warn("Low-powered device detected. Aborting model load.");
	// Optionally, show a message to the user or load a simpler model
} else {
	waves();
}