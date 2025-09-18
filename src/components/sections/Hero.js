import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class Hero {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = null;
        this.renderer = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }

    init() {
        // Create hero section
        const section = document.createElement('section');
        section.className = 'section1';

        // Create container
        const container = document.createElement('div');
        container.className = 'container';

        // Create main heading
        const heading = document.createElement('div');
        heading.className = 'main-heading';
        heading.innerHTML = `
            <h1 class="heading-main">
                We Augment <br>
                <span class="incredible">Incredible</span><br>
                <span class="experiences">Experiences.</span>
            </h1>
        `;

        // Create scroll indicator
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = `
            <div class="mouse">
                <div class="wheel"></div>
            </div>
            <div class="arrow">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        // Add content to container
        container.appendChild(heading);
        container.appendChild(scrollIndicator);
        section.appendChild(container);
        this.container.appendChild(section);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .section1 {
                height: 100vh;
                position: relative;
                overflow: hidden;
            }

            .main-heading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                z-index: 10;
            }

            .heading-main {
                font-size: 4em;
                font-weight: bold;
                line-height: 1.2;
                color: white;
            }

            .incredible {
                color: #00ff88;
                font-size: 1.2em;
            }

            .experiences {
                color: #ffffff;
                opacity: 0.9;
            }

            .scroll-indicator {
                position: absolute;
                bottom: 40px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                color: white;
                z-index: 10;
            }

            .mouse {
                width: 30px;
                height: 50px;
                border: 2px solid white;
                border-radius: 15px;
                position: relative;
            }

            .wheel {
                width: 4px;
                height: 8px;
                background: white;
                position: absolute;
                top: 8px;
                left: 50%;
                transform: translateX(-50%);
                border-radius: 2px;
                animation: scroll 1.5s infinite;
            }

            .arrow {
                margin-top: 10px;
            }

            .arrow span {
                display: block;
                width: 10px;
                height: 10px;
                border-bottom: 2px solid white;
                border-right: 2px solid white;
                transform: rotate(45deg);
                margin: -5px;
                animation: arrow 1.5s infinite;
            }

            @keyframes scroll {
                0% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(15px); }
            }

            @keyframes arrow {
                0% { opacity: 0; transform: rotate(45deg) translate(-5px, -5px); }
                50% { opacity: 1; }
                100% { opacity: 0; transform: rotate(45deg) translate(5px, 5px); }
            }
        `;
        document.head.appendChild(style);

        // Scene setup
        this.scene.fog = new THREE.FogExp2(0x0B0812, 0.002);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(this.scene.fog.color);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 3000);
        this.camera.position.set(800, 100, 500);
        this.camera.lookAt(this.scene.position);

        // Add event listeners
        window.addEventListener('resize', () => this.onWindowResize(), false);
        document.addEventListener('mousemove', (event) => this.onMouseMove(event), false);

        // Create scene elements
        this.createGeometry();
        this.createLights();
    }

    createGeometry() {
        // Create triangles and main geometry here
        // ... (Previous Three.js geometry creation code)
    }

    createLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(ambientLight);

        const lights = [];
        lights[0] = new THREE.PointLight(0xffffff, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);

        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);

        lights.forEach(light => this.scene.add(light));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        this.mouseX = event.clientX - window.innerWidth / 2;
        this.mouseY = event.clientY - window.innerHeight / 2;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update camera position based on mouse
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }
}
