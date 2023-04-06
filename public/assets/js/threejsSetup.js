// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 300);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
const container = document.getElementById("threejs-container");
container.style.background = "transparent"; // Set container's background to transparent
container.appendChild(renderer.domElement);

// Create the cube with different materials
const materials = [
  new THREE.MeshPhongMaterial({ color: 0xff0000 }), // red
  new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // green
  new THREE.MeshPhongMaterial({ color: 0x0000ff }), // blue
  new THREE.MeshPhongMaterial({ color: 0xffff00 }), // yellow
  new THREE.MeshPhongMaterial({ color: 0xff00ff }), // magenta
  new THREE.MeshPhongMaterial({ color: 0x00ffff }), // cyan
];
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, materials);
cube.scale.set(3, 3, 3); // Set the scale of the cube to 3 in each dimension
scene.add(cube);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Set the camera position
camera.position.z = 10;

// Create the animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.025;
  cube.rotation.y += 0.025;

  renderer.render(scene, camera);
}

// Start the animation loop
animate();
