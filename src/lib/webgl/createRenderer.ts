// @ts-nocheck
import * as THREE from 'three';
import { getWebGLPixelRatio } from '../device-capability';

export interface WebGLRendererOptions {
  canvas?: HTMLCanvasElement;
  antialias?: boolean;
  alpha?: boolean;
}

export function createWebGLRenderer(options: WebGLRendererOptions = {}): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas: options.canvas,
    antialias: options.antialias ?? true,
    alpha: options.alpha ?? true,
  });
  renderer.setPixelRatio(getWebGLPixelRatio());
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  return renderer;
}

export function updateRendererSize(renderer: THREE.WebGLRenderer, width: number, height: number): void {
  const pixelRatio = getWebGLPixelRatio();
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
}
