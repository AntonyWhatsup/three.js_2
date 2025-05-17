import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
scene.add(cube);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.castShadow = true;
directionalLight.position.set(1, 2, 1);
scene.add(directionalLight);

const floorGeometry = new THREE.PlaneGeometry(5, 5);
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
floor.receiveShadow = true;
scene.add(floor);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 100 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.position.set(1.5, 0, 0);
scene.add(sphere);

const torusGeometry = new THREE.TorusGeometry(0.4, 0.15, 16, 100);
const torusMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.castShadow = true;
torus.position.set(-1.5, 0, 0);
scene.add(torus);

camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

let angle = 0;
let sphereTime = 0;
let torusTime = 0;
const radius = 2;

function animate() {
  requestAnimationFrame(animate);

  angle += 0.01;
  cube.position.x = radius * Math.cos(angle);
  cube.position.z = radius * Math.sin(angle);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  sphereTime += 0.02;
  sphere.position.y = Math.sin(sphereTime) * 1.0;

  torusTime += 0.03;
  const scale = 1 + 0.3 * Math.sin(torusTime);
  torus.scale.set(scale, scale, scale);

  renderer.render(scene, camera);
}

animate();
