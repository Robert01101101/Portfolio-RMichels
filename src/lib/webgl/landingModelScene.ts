// @ts-nocheck
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  particleWavesFragmentShader,
  particleWavesVertexShader,
} from '../particle-waves-shaders';

const SM_BREAKPOINT = 576;
const XL_BREAKPOINT = 1200;

export interface LandingModelScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mouseX: number;
  mouseY: number;
  windowHalfX: number;
  windowHalfY: number;
  loaded: boolean;
}

export function getLandingModelDisplaySize(): { width: number; height: number } {
  const xl = window.innerWidth >= XL_BREAKPOINT;
  return {
    width: window.innerWidth,
    height: xl ? window.innerHeight : window.innerHeight * 0.8,
  };
}

function handleParticles(scene: THREE.Scene, mesh: THREE.Object3D): void {
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

export function createLandingModelScene(): LandingModelScene {
  const scene = new THREE.Scene();
  const { width, height } = getLandingModelDisplaySize();

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = window.innerWidth > SM_BREAKPOINT ? 11 : 15;
  camera.rotation.x = -Math.PI / 5;

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const light = new THREE.PointLight(0xc7c7c7, 1.5, 0, 0);
  light.decay = 0;
  light.position.set(-6, 7, 6);
  scene.add(light);

  const windowHalfX =
    window.innerWidth < XL_BREAKPOINT ? window.innerWidth / 2 : (window.innerWidth / 4) * 3;

  return {
    scene,
    camera,
    mouseX: 0,
    mouseY: 0,
    windowHalfX,
    windowHalfY: window.innerHeight / 4,
    loaded: false,
  };
}

export function loadLandingModel(
  landing: LandingModelScene,
  onLoaded?: () => void,
  onError?: (error: unknown) => void,
): void {
  // me_v2.glb (~2MB) stays in-repo uncompressed; callers defer invocation until after LCP.
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/me_v2.glb',
    (gltf) => {
      const mesh = gltf.scene.children[0];
      const meshMat = (mesh as THREE.Mesh).material;
      if (meshMat && 'roughness' in meshMat) {
        (meshMat as THREE.MeshStandardMaterial).roughness = 0.71;
        (meshMat as THREE.MeshStandardMaterial).metalness = 0.01;
      }
      landing.scene.add(mesh);
      handleParticles(landing.scene, mesh);
      landing.loaded = true;
      onLoaded?.();
    },
    undefined,
    (error) => onError?.(error),
  );
}

export function updateLandingModelCamera(landing: LandingModelScene): void {
  landing.windowHalfX =
    window.innerWidth < XL_BREAKPOINT ? window.innerWidth / 2 : (window.innerWidth / 4) * 3;
  landing.camera.position.z = window.innerWidth > SM_BREAKPOINT ? 11 : 15;

  landing.camera.position.x += (landing.mouseX - landing.camera.position.x) * 0.015;
  landing.camera.position.y += (-landing.mouseY - landing.camera.position.y) * 0.015;
  landing.camera.lookAt(landing.scene.position);
}

export function setLandingModelMouse(
  landing: LandingModelScene,
  clientX: number,
  clientY: number,
): void {
  landing.mouseX = (landing.windowHalfX - clientX) / 230;
  landing.mouseY = (landing.windowHalfY - clientY) / 230;
}

export function resizeLandingModelCamera(landing: LandingModelScene, width: number, height: number): void {
  landing.camera.aspect = width / height;
  landing.camera.updateProjectionMatrix();
}
