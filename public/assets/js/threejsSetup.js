// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 300);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
renderer.setPixelRatio(10);
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

// Create a colorful torus
const torusGeometry = new THREE.TorusGeometry(4, 1, 16, 100);
const torusMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;

    void main() {
      float r = vUv.x;
      float g = vUv.y;
      float b = 1.0 - vUv.x;
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `,
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);
const pointLight = new THREE.PointLight(0xff0000, 1, 50);
pointLight.position.set(10, 0, 0);
scene.add(pointLight);

// Set the camera position
camera.position.z = 20;

// Create the animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube, torus
  cube.rotation.x += 0.025;
  cube.rotation.y += 0.025;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.02;

  
  renderer.render(scene, camera);
}

// Start the animation loop
animate();