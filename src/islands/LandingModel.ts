// @ts-nocheck
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  particleWavesFragmentShader,
  particleWavesVertexShader,
} from '../lib/particle-waves-shaders';

const smBreakPoint = 576;
const xlBreakPoint = 1200;

function getCanvasDisplaySize() {
  const xl = window.innerWidth >= xlBreakPoint;
  return {
    width: window.innerWidth,
    height: xl ? window.innerHeight : window.innerHeight * 0.8,
  };
}

function resizeRendererToDisplaySize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const displayWidth = canvas.clientWidth || getCanvasDisplaySize().width;
  const displayHeight = canvas.clientHeight || getCanvasDisplaySize().height;
  const width = displayWidth * pixelRatio;
  const height = displayHeight * pixelRatio;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = displayWidth / displayHeight;
    camera.updateProjectionMatrix();
  }
  return needResize;
}

function handleParticles(scene: THREE.Scene, mesh: THREE.Object3D) {
  const childMesh = mesh as THREE.Mesh;
  if (!childMesh.geometry) return;

  const pointGeo = new THREE.BufferGeometry();
  pointGeo.copy(childMesh.geometry);

  const scales = new Float32Array(pointGeo.getAttribute('position').count);
  scales.fill(0.05);
  pointGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color(0xffffff) } },
    vertexShader: particleWavesVertexShader,
    fragmentShader: particleWavesFragmentShader,
  });

  const particles = new THREE.Points(pointGeo, material);
  particles.scale.copy(mesh.scale);
  particles.rotation.copy(mesh.rotation);
  particles.position.copy(mesh.position);
  scene.add(particles);
}

export function initLandingModel() {
  const canvas = document.querySelector<HTMLCanvasElement>('#threeModel');
  const tmpImage = document.getElementById('landingModelImage');
  if (!canvas || !tmpImage) return;

  const isLowPoweredDevice = () => /mobile|android|iphone|ipod/.test(navigator.userAgent.toLowerCase());

  if (isLowPoweredDevice()) {
    console.warn('Low-powered device detected. Aborting model load.');
    return;
  }

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const tmpSpinner = document.getElementById('spinner');
  let doneLoading = false;

  setTimeout(() => {
    if (!doneLoading && tmpSpinner) tmpSpinner.style.display = '';
  }, 300);

  const { width: initialWidth, height: initialHeight } = getCanvasDisplaySize();
  const pixelRatio = window.devicePixelRatio;
  renderer.setSize(initialWidth * pixelRatio, initialHeight * pixelRatio, false);

  const camera = new THREE.PerspectiveCamera(75, initialWidth / initialHeight, 0.1, 1000);
  camera.position.z = window.innerWidth > smBreakPoint ? 11 : 15;
  camera.rotation.x = -Math.PI / 5;

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const light = new THREE.PointLight(0xc7c7c7, 1.5, 0, 0);
  light.decay = 0; // match legacy three r120 default; r175 defaults to 2 and washes out shading
  light.position.set(-6, 7, 6);
  scene.add(light);

  let mouseX = 0;
  let mouseY = 0;
  let windowHalfX = window.innerWidth < xlBreakPoint ? window.innerWidth / 2 : (window.innerWidth / 4) * 3;
  const windowHalfY = window.innerHeight / 4;

  document.addEventListener('mousemove', (event) => {
    if (!doneLoading) return;
    mouseX = (windowHalfX - event.clientX) / 230;
    mouseY = (windowHalfY - event.clientY) / 230;
  });

  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/me_v2.glb',
    (gltf) => {
      const mesh = gltf.scene.children[0];
      const meshMat = (mesh as THREE.Mesh).material;
      if (meshMat?.isMeshStandardMaterial) {
        meshMat.roughness = 0.71;
        meshMat.metalness = 0.01;
      }
      scene.add(mesh);
      handleParticles(scene, mesh);
      showCanvas();
    },
    undefined,
    (error) => {
      console.error('Failed to load landing model:', error);
      if (tmpSpinner) tmpSpinner.style.display = 'none';
    },
  );

  function showCanvas() {
    renderer.setClearColor(0x000000, 0);
    let frames = 0;
    const waitFrames = () => {
      frames++;
      renderer.render(scene, camera);
      if (frames < 20) requestAnimationFrame(waitFrames);
      else if (frames < 21) {
        canvas.style.display = '';
        requestAnimationFrame(waitFrames);
      } else if (frames < 22) {
        canvas.style.visibility = 'visible';
        requestAnimationFrame(waitFrames);
      } else {
        tmpImage.style.display = 'none';
        if (tmpSpinner) tmpSpinner.style.display = 'none';
        doneLoading = true;
      }
    };
    requestAnimationFrame(waitFrames);
  }

  function animate() {
    requestAnimationFrame(animate);
    if (resizeRendererToDisplaySize(renderer, camera)) {
      windowHalfX = window.innerWidth < xlBreakPoint ? window.innerWidth / 2 : (window.innerWidth / 4) * 3;
      camera.position.z = window.innerWidth > smBreakPoint ? 11 : 15;
    }
    camera.position.x += (mouseX - camera.position.x) * 0.015;
    camera.position.y += (-mouseY - camera.position.y) * 0.015;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  animate();

  canvas.addEventListener('webglcontextlost', (event) => {
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
  initLandingModel();
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(start);
} else {
  setTimeout(start, 1);
}
