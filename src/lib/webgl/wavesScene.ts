// @ts-nocheck
import * as THREE from 'three';
import { getDevicePerformanceTier } from '../device-capability';
import {
  particleWavesFragmentShader,
  particleWavesVertexShader,
} from '../particle-waves-shaders';

const SEPARATION = 160;

export interface ParticleGrid {
  amountX: number;
  amountY: number;
}

export function getParticleGrid(): ParticleGrid {
  const w = window.innerWidth;
  const tier = getDevicePerformanceTier();

  if (tier === 'reduced') {
    if (w < 768) return { amountX: 70, amountY: 16 };
    if (w < 1200) return { amountX: 90, amountY: 24 };
    return { amountX: 120, amountY: 30 };
  }

  if (w < 768) return { amountX: 90, amountY: 20 };
  if (w < 1200) return { amountX: 120, amountY: 30 };
  return { amountX: 180, amountY: 40 };
}

export interface WavesScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  particles: THREE.Points;
  material: THREE.ShaderMaterial;
  amountX: number;
  amountY: number;
  count: number;
}

export function createWavesScene(grid?: ParticleGrid): WavesScene {
  const { amountX, amountY } = grid ?? getParticleGrid();
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 3500;

  const numParticles = amountX * amountY;
  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);

  let i = 0;
  for (let ix = 0; ix < amountX; ix++) {
    for (let iy = 0; iy < amountY; iy++) {
      positions[i] = ix * SEPARATION - (amountX * SEPARATION) / 2;
      positions[i + 1] = 0;
      positions[i + 2] = iy * SEPARATION - (amountY * SEPARATION) / 2;
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

  return { scene, camera, particles, material, amountX, amountY, count: 0 };
}

export function updateWavesCamera(
  waves: WavesScene,
  scrollY: number,
  docHeight: number,
): void {
  waves.camera.position.y = docHeight - scrollY + 100;

  const t = Math.max(0, Math.min(1, scrollY / docHeight));
  const newCol = 0.13 + t * (0.38 - 0.13);
  waves.material.uniforms.color.value.setRGB(newCol, newCol, newCol);
}

export function animateWavesParticles(waves: WavesScene, active = true): void {
  if (!active) return;

  const positionsAttr = waves.particles.geometry.getAttribute('position') as THREE.BufferAttribute;
  const scalesAttr = waves.particles.geometry.getAttribute('scale') as THREE.BufferAttribute;
  let idx = 0;
  let scaleIdx = 0;

  for (let ix = 0; ix < waves.amountX; ix++) {
    for (let iy = 0; iy < waves.amountY; iy++) {
      positionsAttr.array[idx + 1] =
        Math.sin((ix + waves.count) * 0.3) * 200 + Math.sin((iy + waves.count) * 0.5) * 100;
      scalesAttr.array[scaleIdx] =
        (Math.sin((ix + waves.count) * 0.3) + 1) * 8 + (Math.sin((iy + waves.count) * 0.5) + 1) * 1;
      idx += 3;
      scaleIdx++;
    }
  }

  positionsAttr.needsUpdate = true;
  scalesAttr.needsUpdate = true;
  waves.count += 0.02;
}

export function resizeWavesCamera(waves: WavesScene): void {
  waves.camera.aspect = window.innerWidth / window.innerHeight;
  waves.camera.updateProjectionMatrix();
}
