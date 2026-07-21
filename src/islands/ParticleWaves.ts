// @ts-nocheck
import * as THREE from 'three';
import { calcDocHeight, mapVal } from './tools';
import { getWebGLPixelRatio, isLowPoweredDevice } from '../lib/device-capability';
import { getScrollLenis } from '../lib/scroll-lenis';
import {
  particleWavesFragmentShader,
  particleWavesVertexShader,
} from '../lib/particle-waves-shaders';

const SEPARATION = 160;

function getParticleGrid() {
  const w = window.innerWidth;
  if (w < 768) return { amountX: 90, amountY: 20 };
  if (w < 1200) return { amountX: 120, amountY: 30 };
  return { amountX: 180, amountY: 40 };
}

export function initParticleWaves() {
  if (document.querySelector('.waves')) return;

  const { amountX: AMOUNTX, amountY: AMOUNTY } = getParticleGrid();
  let count = 0;
  let docHeight = calcDocHeight();

  const container = document.createElement('div');
  container.classList.add('waves');
  document.body.appendChild(container);

  const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 3500;

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
    vertexShader: particleWavesVertexShader,
    fragmentShader: particleWavesFragmentShader,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const canvas = renderer.domElement;
  canvas.style.visibility = 'hidden';
  canvas.classList.add('wavesCanvas');
  renderer.setPixelRatio(getWebGLPixelRatio());
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(canvas);

  const getScrollY = () => getScrollLenis()?.animatedScroll ?? window.scrollY ?? 0;

  const updateCamera = (scrollY = getScrollY()) => {
    docHeight = calcDocHeight();
    camera.position.y = docHeight - scrollY + 100;

    const newCol = mapVal(scrollY, 0, docHeight, 0.13, 0.38);
    material.uniforms.color.value.setRGB(
      Math.max(0.13, newCol),
      Math.max(0.13, newCol),
      Math.max(0.13, newCol),
    );
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(getWebGLPixelRatio());
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateCamera();
  };

  const render = () => {
    const positionsAttr = particles.geometry.getAttribute('position') as THREE.BufferAttribute;
    const scalesAttr = particles.geometry.getAttribute('scale') as THREE.BufferAttribute;
    let idx = 0;
    let scaleIdx = 0;

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positionsAttr.array[idx + 1] =
          Math.sin((ix + count) * 0.3) * 200 + Math.sin((iy + count) * 0.5) * 100;
        scalesAttr.array[scaleIdx] =
          (Math.sin((ix + count) * 0.3) + 1) * 8 + (Math.sin((iy + count) * 0.5) + 1) * 1;
        idx += 3;
        scaleIdx++;
      }
    }

    positionsAttr.needsUpdate = true;
    scalesAttr.needsUpdate = true;
    renderer.render(scene, camera);
    count += 0.02;
  };

  let animationId: number | null = null;

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (document.hidden) return;
    render();
  };

  const startAnimate = () => {
    if (animationId === null) {
      animationId = requestAnimationFrame(animate);
    }
  };

  const stopAnimate = () => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAnimate();
    } else {
      startAnimate();
    }
  });

  const refreshWindow = () => updateCamera();

  const hookLenis = () => {
    const lenis = getScrollLenis();
    if (lenis) {
      lenis.on('scroll', (instance) => {
        updateCamera(instance.animatedScroll);
      });
      updateCamera(lenis.animatedScroll);
      return;
    }
    requestAnimationFrame(hookLenis);
  };

  const showCanvasAfterFirstRender = () => {
    renderer.setClearColor(0x000000, 0);
    let frames = 0;
    const waitFrames = () => {
      render();
      if (frames++ < 15) {
        requestAnimationFrame(waitFrames);
      } else {
        canvas.style.visibility = 'visible';
      }
    };
    requestAnimationFrame(waitFrames);
  };

  window.addEventListener('resize', onWindowResize);
  refreshWindow();
  setTimeout(refreshWindow, 500);
  hookLenis();
  startAnimate();
  showCanvasAfterFirstRender();

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    canvas.style.display = 'none';
    stopAnimate();
  });

  canvas.addEventListener('webglcontextrestored', () => {
    canvas.style.display = '';
    startAnimate();
  });
}

function start() {
  if (isLowPoweredDevice()) {
    console.warn('Low-powered device detected. Aborting particle waves load.');
    return;
  }

  initParticleWaves();
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(start);
} else {
  setTimeout(start, 1);
}
