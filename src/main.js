import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MainContent } from './components/MainContent.js';

// Initialize core components
let scene, camera, renderer, controls, mainContent;

// Setup scene
function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
}

// Setup camera
function initCamera() {
    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 7);
    camera.lookAt(0, 0, 0);
}

// Setup renderer
function initRenderer() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x111111, 1);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Setup canvas
    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);
}

// Setup lights
function initLights() {
    // Softer ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Main directional light from front-top
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(0, 3, 5);
    scene.add(directionalLight);

    // Purple accent light from left
    const pointLight1 = new THREE.PointLight(0x9D00FF, 3.5, 12);
    pointLight1.position.set(-3.5, 2, 3);
    scene.add(pointLight1);

    // Cyan accent light from right
    const pointLight2 = new THREE.PointLight(0x00FFFF, 3.5, 12);
    pointLight2.position.set(3.5, -2, 3);
    scene.add(pointLight2);

    // Subtle backlight for depth
    const backLight = new THREE.PointLight(0x6A00FF, 2.5, 15);
    backLight.position.set(0, 0, -4);
    scene.add(backLight);

    // Add rim light for better edge definition
    const rimLight = new THREE.PointLight(0xFFFFFF, 2, 10);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);
}

// Setup controls
function initControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Mouse movement handler
const mouse = new THREE.Vector2();
let targetX = 0;
let targetY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function onMouseMove(event) {
    mouse.x = (event.clientX - windowHalfX) / windowHalfX;
    mouse.y = (event.clientY - windowHalfY) / windowHalfY;
    
    targetX = mouse.x * 3.0;
    targetY = -mouse.y * 3.0;
    
    scene.userData.mouseX = mouse.x;
    scene.userData.mouseY = mouse.y;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Update content
    mainContent.update();

    // Smooth camera movement with increased range and speed
    camera.position.x += (targetX * 0.8 - camera.position.x) * 0.12;
    camera.position.y += (targetY * 0.8 - camera.position.y) * 0.12;
    camera.lookAt(0, 0, 0);

    // Render
    renderer.render(scene, camera);
}

// Initialize everything
function init() {
    initScene();
    initCamera();
    initRenderer();
    initLights();
    initControls();

    // Add main content
    mainContent = new MainContent(scene);

    // Add event listeners
    window.addEventListener('resize', () => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        onWindowResize();
    });
    window.addEventListener('mousemove', onMouseMove);

    // Start animation loop
    animate();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            overflow-x: hidden;
            background: #111111;
            font-family: 'Arial', sans-serif;
            min-height: 200vh;
        }
        canvas {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            z-index: -1 !important;
            width: 100vw !important;
            height: 100vh !important;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // Initialize
    init();
});
