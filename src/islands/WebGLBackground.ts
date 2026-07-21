// @ts-nocheck
import { calcDocHeight } from './tools';
import { getDevicePerformanceTier } from '../lib/device-capability';
import { getScrollLenis } from '../lib/scroll-lenis';
import { addAnimationCallback } from '../lib/webgl/animationLoop';
import { createWebGLRenderer, updateRendererSize } from '../lib/webgl/createRenderer';
import {
  animateWavesParticles,
  createWavesScene,
  resizeWavesCamera,
  updateWavesCamera,
} from '../lib/webgl/wavesScene';

export function initWebGLBackground() {
  if (document.querySelector('.waves')) return;

  const tier = getDevicePerformanceTier();
  if (tier === 'minimal') {
    console.warn('Low-powered device detected. Aborting particle waves load.');
    return;
  }

  const container = document.createElement('div');
  container.classList.add('waves');
  document.body.appendChild(container);

  const waves = createWavesScene();
  const renderer = createWebGLRenderer();
  const canvas = renderer.domElement;
  canvas.style.visibility = 'hidden';
  canvas.classList.add('wavesCanvas');
  container.appendChild(canvas);

  let docHeight = calcDocHeight();
  let warmupFrames = 0;

  const getScrollY = () => getScrollLenis()?.animatedScroll ?? window.scrollY ?? 0;

  const updateCamera = (scrollY?: number) => {
    docHeight = calcDocHeight();
    updateWavesCamera(waves, scrollY ?? getScrollY(), docHeight);
  };

  const onWindowResize = () => {
    updateRendererSize(renderer, window.innerWidth, window.innerHeight);
    resizeWavesCamera(waves);
    updateCamera();
  };

  let contextLost = false;

  const renderFrame = () => {
    if (contextLost) return;

    animateWavesParticles(waves);
    renderer.render(waves.scene, waves.camera);

    if (warmupFrames < 15) {
      warmupFrames++;
      if (warmupFrames === 15) {
        canvas.style.visibility = 'visible';
      }
    }
  };

  addAnimationCallback(() => {
    renderFrame();
  });

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

  window.addEventListener('resize', onWindowResize);
  updateCamera();
  setTimeout(updateCamera, 500);
  hookLenis();

  canvas.addEventListener('webglcontextlost', (event: Event) => {
    event.preventDefault();
    canvas.style.display = 'none';
    contextLost = true;
  });

  canvas.addEventListener('webglcontextrestored', () => {
    canvas.style.display = '';
    contextLost = false;
  });
}

function start() {
  initWebGLBackground();
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(start);
} else {
  setTimeout(start, 1);
}
