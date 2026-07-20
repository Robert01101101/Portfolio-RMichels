// @ts-nocheck
import * as THREE from 'three';

export function initParticleWaves() {
  if (document.querySelector('.waves')) return;

  const SEPARATION = 160;
  const AMOUNTX = 180;
  const AMOUNTY = 40;

  let count = 0;
  let mouseX = 0;
  let mouseY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  const calcDocHeight = () => {
    const body = document.body;
    const html = document.documentElement;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
  };

  let docHeight = calcDocHeight();

  const container = document.createElement('div');
  container.classList.add('waves');
  document.body.appendChild(container);

  const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 3500;
  camera.position.y = (docHeight - 200 - window.scrollY) * 10;

  const scene = new THREE.Scene();
  const numParticles = AMOUNTX * AMOUNTY;
  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);

  let i = 0;
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
      positions[i + 1] = 0;
      positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
      scales[i / 3] = 1;
      i += 3;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color(0x666666) } },
    vertexShader: document.getElementById('vertexshader')?.textContent ?? '',
    fragmentShader: document.getElementById('fragmentshader')?.textContent ?? '',
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const onWindowResize = () => {
    docHeight = calcDocHeight();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const onDocumentMouseMove = (event: MouseEvent) => {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  };

  const animate = () => {
    requestAnimationFrame(animate);
    camera.position.y = (docHeight - 200 - window.scrollY) * 10;
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    const positionsAttr = particles.geometry.getAttribute('position') as THREE.BufferAttribute;
    const scalesAttr = particles.geometry.getAttribute('scale') as THREE.BufferAttribute;
    let idx = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positionsAttr.array[idx + 1] =
          Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
        scalesAttr.array[idx / 3] =
          (Math.sin((ix + count) * 0.3) + 1) * 8 + (Math.sin((iy + count) * 0.5) + 1) * 8;
        idx += 3;
      }
    }
    positionsAttr.needsUpdate = true;
    scalesAttr.needsUpdate = true;
    renderer.render(scene, camera);
    count += 0.1;
  };

  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onDocumentMouseMove);
  animate();
}

function start() {
  const vertexShader = document.getElementById('vertexshader')?.textContent;
  const fragmentShader = document.getElementById('fragmentshader')?.textContent;
  if (!vertexShader || !fragmentShader) {
    requestAnimationFrame(start);
    return;
  }
  initParticleWaves();
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(start);
} else {
  setTimeout(start, 1);
}
