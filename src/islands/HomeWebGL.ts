// @ts-nocheck
import { getDevicePerformanceTier } from '../lib/device-capability';
import { calcDocHeight } from '../islands/tools';
import { getScrollLenis } from '../lib/scroll-lenis';
import { addAnimationCallback } from '../lib/webgl/animationLoop';
import { createWebGLRenderer, updateRendererSize } from '../lib/webgl/createRenderer';
import {
  animateWavesParticles,
  createWavesScene,
  resizeWavesCamera,
  updateWavesCamera,
} from '../lib/webgl/wavesScene';
import {
  createLandingModelScene,
  loadLandingModel,
  resizeLandingModelCamera,
  setLandingModelMouse,
  updateLandingModelCamera,
} from '../lib/webgl/landingModelScene';

export function initHomeWebGL() {
  if (document.querySelector('.waves')) return;

  const tier = getDevicePerformanceTier();
  if (tier === 'minimal') {
    console.warn('Low-powered device detected. Aborting WebGL load.');
    return;
  }

  const modelContainer = document.getElementById('threeModel');
  const tmpImage = document.getElementById('landingModelImage') as HTMLImageElement | null;
  const tmpSpinner = document.getElementById('spinner');
  const landingArea = document.getElementById('landingArea');

  if (!modelContainer || !tmpImage) return;

  const container = document.createElement('div');
  container.classList.add('waves');
  document.body.appendChild(container);

  const renderer = createWebGLRenderer();
  const canvas = renderer.domElement;
  canvas.style.visibility = 'hidden';
  canvas.classList.add('wavesCanvas');
  container.appendChild(canvas);

  const waves = createWavesScene();
  const landing = createLandingModelScene();

  let docHeight = calcDocHeight();
  let modelVisible = true;
  let modelLoaded = false;
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

  const renderFrame = () => {
    const dpr = renderer.getPixelRatio();
    const bufferWidth = Math.floor(window.innerWidth * dpr);
    const bufferHeight = Math.floor(window.innerHeight * dpr);

    animateWavesParticles(waves);

    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, bufferWidth, bufferHeight);
    renderer.autoClear = true;
    renderer.render(waves.scene, waves.camera);

    if (modelLoaded && modelVisible) {
      const rect = modelContainer.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const left = Math.floor(rect.left * dpr);
        const bottom = Math.floor((window.innerHeight - rect.bottom) * dpr);
        const width = Math.floor(rect.width * dpr);
        const height = Math.floor(rect.height * dpr);

        renderer.setScissorTest(true);
        renderer.setScissor(left, bottom, width, height);
        renderer.setViewport(left, bottom, width, height);
        renderer.autoClear = false;
        renderer.clearDepth();

        resizeLandingModelCamera(landing, rect.width, rect.height);
        updateLandingModelCamera(landing);
        renderer.render(landing.scene, landing.camera);

        renderer.setScissorTest(false);
        renderer.autoClear = true;
      }
    }

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

  const showModel = () => {
    modelLoaded = true;
    modelContainer.style.display = '';
    requestAnimationFrame(() => {
      modelContainer.style.visibility = 'visible';
      tmpImage.style.display = 'none';
      if (tmpSpinner) tmpSpinner.style.display = 'none';
    });
  };

  setTimeout(() => {
    if (!modelLoaded && tmpSpinner) tmpSpinner.style.display = '';
  }, 300);

  const scheduleLandingModelLoad = () => {
    loadLandingModel(
      landing,
      showModel,
      (error) => {
        console.error('Failed to load landing model:', error);
        if (tmpSpinner) tmpSpinner.style.display = 'none';
      },
    );
  };

  // Defer me_v2.glb (~2MB) until after LCP-critical content; static webp remains visible meanwhile.
  if ('requestIdleCallback' in window) {
    requestIdleCallback(scheduleLandingModelLoad, { timeout: 4000 });
  } else {
    window.addEventListener('load', () => setTimeout(scheduleLandingModelLoad, 200), { once: true });
  }

  const onMouseMove = (event: MouseEvent) => {
    if (!modelLoaded || !modelVisible) return;
    setLandingModelMouse(landing, event.clientX, event.clientY);
  };

  document.addEventListener('mousemove', onMouseMove);

  const visibilityTarget = landingArea ?? modelContainer;
  const observer = new IntersectionObserver(
    (entries) => {
      modelVisible = entries.some((e) => e.isIntersecting);
    },
    { threshold: 0.05 },
  );
  observer.observe(visibilityTarget);

  window.addEventListener('resize', onWindowResize);
  updateCamera();
  setTimeout(updateCamera, 500);
  hookLenis();

  canvas.addEventListener('webglcontextlost', (event: Event) => {
    event.preventDefault();
    canvas.style.display = 'none';
    tmpImage.style.display = '';
  });

  canvas.addEventListener('webglcontextrestored', () => {
    canvas.style.display = '';
    tmpImage.style.display = 'none';
  });
}

function start() {
  initHomeWebGL();
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(start);
} else {
  setTimeout(start, 1);
}
