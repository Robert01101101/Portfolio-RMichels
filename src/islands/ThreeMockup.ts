// @ts-nocheck
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function initThreeMockup() {
  const canvas = document.querySelector<HTMLCanvasElement>('#threeModel');
  if (!canvas) return;

  const isPhone = canvas.hasAttribute('data-mockup-phone');
  const spinner = document.getElementById('spinner');
  const video = document.getElementById('video') as HTMLVideoElement | null;

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
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
  loader.load(path, (gltf) => {
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
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }
  animate();
}

initThreeMockup();
