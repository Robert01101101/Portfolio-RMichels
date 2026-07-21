// @ts-nocheck
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getDevicePerformanceTier, getWebGLPixelRatio } from '../lib/device-capability';
import { addAnimationCallback } from '../lib/webgl/animationLoop';

type MockupType = 'phone' | 'hololens';

/**
 * Static fallbacks when WebGL/GLB is skipped (minimal/reduced tier) or load fails.
 * hlAndBridgeCombined.glb (~20MB) is not compressed in-repo; reduced/minimal tiers use these instead.
 */
const MOCKUP_FALLBACKS: Record<MockupType, string> = {
  hololens: '/assets/img/clirioScanViews/lqip/bridgeScanView.jpg',
  phone: '/assets/video/frame.jpg',
};

function getMockupType(canvas: HTMLCanvasElement): MockupType {
  return canvas.hasAttribute('data-mockup-phone') ? 'phone' : 'hololens';
}

function showMockupFallback(canvas: HTMLCanvasElement, mockupType: MockupType) {
  const fallbackSrc = MOCKUP_FALLBACKS[mockupType];
  const mockupSection = document.querySelector('.mockup');
  if (!mockupSection || mockupSection.querySelector('.mockupFallback')) return;

  const img = document.createElement('img');
  img.src = fallbackSrc;
  img.alt = '';
  img.className = 'mockupFallback';
  img.loading = 'lazy';
  img.decoding = 'async';
  mockupSection.appendChild(img);
  canvas.style.display = 'none';
}

function shouldSkipGlbLoad(tier: string, mockupType: MockupType): boolean {
  if (tier === 'minimal') return true;
  // Avoid fetching hlAndBridgeCombined.glb on reduced-tier devices; phone.glb is small enough to load.
  if (tier === 'reduced' && mockupType === 'hololens') return true;
  return false;
}

export function initThreeMockup() {
  const canvas = document.querySelector<HTMLCanvasElement>('#threeModel');
  if (!canvas) return;

  const mockupType = getMockupType(canvas);
  const tier = getDevicePerformanceTier();

  if (shouldSkipGlbLoad(tier, mockupType)) {
    console.warn(`Skipping ${mockupType} GLB on ${tier} tier; using static fallback.`);
    showMockupFallback(canvas, mockupType);
    return;
  }

  const isPhone = mockupType === 'phone';
  const spinner = document.getElementById('spinner');
  const video = document.getElementById('video') as HTMLVideoElement | null;

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(getWebGLPixelRatio());
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 5;

  scene.add(new THREE.AmbientLight(0xffffff, 1));

  let videoTexture: THREE.VideoTexture | undefined;
  if (video) {
    video.play().catch(() => video.load());
    videoTexture = new THREE.VideoTexture(video);
  }

  const path = isPhone ? '/assets/models/phone.glb' : '/assets/models/hlAndBridgeCombined.glb';
  const loader = new GLTFLoader();

  const onModelLoaded = (gltf: { scene: THREE.Group }) => {
    const mockupMesh = gltf.scene.children[0];
    mockupMesh.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        if (isPhone && (mesh.material as THREE.MeshStandardMaterial).name === 'screen' && videoTexture) {
          mesh.material = new THREE.MeshBasicMaterial({ map: videoTexture });
        }
      }
    });
    scene.add(mockupMesh);
    if (spinner) spinner.style.display = 'none';
    canvas.style.display = 'block';
  };

  const onModelError = (error: unknown) => {
    console.error(`Failed to load ${mockupType} mockup model:`, error);
    if (spinner) spinner.style.display = 'none';
    showMockupFallback(canvas, mockupType);
  };

  const loadModel = () => {
    loader.load(path, onModelLoaded, undefined, onModelError);
  };

  // Lazy-load heavy hololens GLB after idle so LCP images are not competing for bandwidth.
  if (!isPhone && 'requestIdleCallback' in window) {
    requestIdleCallback(loadModel, { timeout: 4000 });
  } else {
    loadModel();
  }

  let isVisible = true;

  const renderFrame = () => {
    if (!isVisible) return;
    renderer.setPixelRatio(getWebGLPixelRatio());
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };

  addAnimationCallback(renderFrame);

  const observer = new IntersectionObserver(
    (entries) => {
      isVisible = entries.some((e) => e.isIntersecting);
    },
    { threshold: 0.05 },
  );
  observer.observe(canvas);
}

initThreeMockup();
