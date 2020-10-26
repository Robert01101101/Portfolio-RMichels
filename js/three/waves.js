
function waves () {

	var SEPARATION = 160, AMOUNTX = 180, AMOUNTY = 40;

	var container;
	var camera, scene, renderer;

	var particles, count = 0;

	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	init();
	animate();

	function init() {

		container = document.createElement( 'div' );
		container.classList.add('waves');
		document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 3500;
		camera.position.y = (scrollLimit - 200 - window.scrollY)*10;

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
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );

		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		window.addEventListener("scroll", updateCamera);
		//

		window.addEventListener( 'resize', onWindowResize, false );

	}

	//_________________________________________ on Scroll
	function updateCamera(ev) {
	    camera.position.y = (scrollLimit + 1600 - window.scrollY)*.5;
	    //console.log("scroll: " + window.scrollY);

	    var newCol = mapVal(window.scrollY, 0, scrollLimit, 0.13, .35);
	    if (newCol < 0.13) newCol = 0.13;
	    particles.material.uniforms.color = { type: "c", value: { r:newCol, g:newCol, b:newCol } };
	    /*
	    particles.material.uniforms.opacity = { value: 0 };
		particles.material.transparent = true;
		particles.material.blendEquation = 10;
	    particles.material.opacity = .1;
	    //gl_FragColor = vec4( color, 1.0 );
	    console.log(particles.material);*/
	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	//

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

	}

	//

	function animate() {

		requestAnimationFrame( animate );

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

		renderer.render( scene, camera );

		count += 0.1;

	}

	console.log(scene);
}

waves();


