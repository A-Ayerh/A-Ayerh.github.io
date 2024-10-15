import { Rigging } from './rigging.js';

let scene, camera, renderer, rigging;

function init() {
    console.log("Initializing scene...");

    // Set up the scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Find the container for the 3D view
    const container = document.getElementById('threejs-container');
    
    // Set up the renderer, attach to container
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    console.log("Renderer added to container");

    // Add a basic point light for the model visibility
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
    console.log("Light added to scene");

    // Add ambient light for softer lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    // Add rigging (human model) to the scene
    rigging = new Rigging(scene);
    console.log("Rigging object added to scene");

    // Set camera position - Zoom out to ensure the full body is visible
    camera.position.set(0, 1.5, 7); // Slightly above the center and farther back
    camera.lookAt(0, 1, 0); // Ensure the camera is looking at the center of the model
    console.log("Camera positioned at:", camera.position);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
