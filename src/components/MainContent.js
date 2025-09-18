import * as THREE from 'three';

export class MainContent {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.triangles = [];
        this.mainTriangle = null;
        this.subTriangle = null;
        this.time = 0;
        this.layers = [];
        this.mouseSpeed = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.size = 2; // Explicitly set size
        
        this.init();
    }

    init() {
        // Create layers for parallax effect
        this.createBackgroundLayer();
        this.createMiddleLayer();
        this.createFrontLayer();
        
        // Create main triangle
        this.createMainTriangle();
        
        // Position the entire group
        this.group.position.z = -2;
        
        // Add group to scene
        this.scene.add(this.group);

        // Set initial layer depths with increased separation
        this.layers.forEach((layer, index) => {
            layer.mesh.position.z = -index * 3.0; // Increased from 2.5 for more depth
        });
    }

    createBackgroundLayer() {
        const geometry = new THREE.ConeGeometry(0.2, 0.4, 3);
        geometry.rotateX(Math.PI / 2);
        
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x5000b5,
            transparent: true,
            opacity: 0.6,
            metalness: 0.2,
            roughness: 0.8,
            side: THREE.DoubleSide
        });

        const layer = new THREE.Group();
        
        // Create scattered triangle pattern
        for (let i = 0; i < 150; i++) {
            const mesh = new THREE.Mesh(geometry, material.clone());
            
            const radius = 8 + Math.random() * 4;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 8;
            
            mesh.position.x = Math.cos(angle) * radius;
            mesh.position.y = height;
            mesh.position.z = Math.sin(angle) * radius;
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;
            
            mesh.scale.setScalar(Math.random() * 0.5 + 0.5);
            
            mesh.userData.originalX = mesh.position.x;
            mesh.userData.originalY = mesh.position.y;
            mesh.userData.originalZ = mesh.position.z;
            mesh.userData.rotationSpeed = (Math.random() - 0.5) * 0.02;
            
            layer.add(mesh);
            this.triangles.push(mesh);
        }
        
        this.layers.push({ mesh: layer, parallaxFactor: 0.4 }); // Increased from 0.25
        this.group.add(layer);
    }

    createMiddleLayer() {
        const geometry = new THREE.ConeGeometry(0.3, 0.6, 3);
        geometry.rotateX(Math.PI / 2);
        
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x811aff,
            transparent: true,
            opacity: 0.7,
            metalness: 0.3,
            roughness: 0.7,
            side: THREE.DoubleSide
        });

        const layer = new THREE.Group();
        
        // Create floating triangle pattern
        for (let i = 0; i < 100; i++) {
            const mesh = new THREE.Mesh(geometry, material.clone());
            
            const radius = 5 + Math.random() * 3;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 6;
            
            mesh.position.x = Math.cos(angle) * radius;
            mesh.position.y = height;
            mesh.position.z = Math.sin(angle) * radius;
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;
            
            mesh.scale.setScalar(Math.random() * 0.6 + 0.4);
            
            mesh.userData.originalX = mesh.position.x;
            mesh.userData.originalY = mesh.position.y;
            mesh.userData.originalZ = mesh.position.z;
            mesh.userData.rotationSpeed = (Math.random() - 0.5) * 0.015;
            
            layer.add(mesh);
            this.triangles.push(mesh);
        }
        
        this.layers.push({ mesh: layer, parallaxFactor: 0.8 }); // Increased from 0.5
        this.group.add(layer);
    }

    createFrontLayer() {
        const geometry = new THREE.ConeGeometry(0.25, 0.5, 3);
        geometry.rotateX(Math.PI / 2);
        
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x941aff,
            transparent: true,
            opacity: 0.5,
            metalness: 0.4,
            roughness: 0.6,
            side: THREE.DoubleSide
        });

        const layer = new THREE.Group();
        
        // Create close triangle pattern
        for (let i = 0; i < 50; i++) {
            const mesh = new THREE.Mesh(geometry, material.clone());
            
            const radius = 3 + Math.random() * 2;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 4;
            
            mesh.position.x = Math.cos(angle) * radius;
            mesh.position.y = height;
            mesh.position.z = Math.sin(angle) * radius;
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;
            
            mesh.scale.setScalar(Math.random() * 0.7 + 0.3);
            
            mesh.userData.originalX = mesh.position.x;
            mesh.userData.originalY = mesh.position.y;
            mesh.userData.originalZ = mesh.position.z;
            mesh.userData.rotationSpeed = (Math.random() - 0.5) * 0.01;
            
            layer.add(mesh);
            this.triangles.push(mesh);
        }
        
        this.layers.push({ mesh: layer, parallaxFactor: 1.2 }); // Increased from 0.8
        this.group.add(layer);
    }

    createMainTriangle() {
        const size = 2;
        
        // Create main shape with simpler, cleaner geometry
        const mainGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            // Outer triangle
            0, size * 1.2, 0,           // top
            -size * 1.04, -0.6 * size, 0,  // bottom left
            size * 1.04, -0.6 * size, 0,   // bottom right
        ]);
        
        mainGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        mainGeometry.computeVertexNormals();

        // Create gradient texture for main triangle
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 1024;
        canvas.height = 1024;
        
        const gradient = context.createRadialGradient(
            canvas.width * 0.5, canvas.height * 0.5, 0,
            canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.7
        );
        
        gradient.addColorStop(0, '#2E0854');    // Deep purple core
        gradient.addColorStop(0.3, '#3D0082');  // Rich purple
        gradient.addColorStop(0.6, '#6A00FF');  // Electric purple
        gradient.addColorStop(0.8, '#9D00FF');  // Bright purple
        gradient.addColorStop(1, '#14002B');    // Dark edge
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        // Enhanced material with better properties
        const material = new THREE.MeshPhysicalMaterial({
            map: texture,
            transparent: true,
            opacity: 0.92,
            metalness: 0.7,
            roughness: 0.2,
            side: THREE.DoubleSide,
            envMapIntensity: 2.0,
            clearcoat: 0.5,
            clearcoatRoughness: 0.3,
            emissive: new THREE.Color(0x2E0854),
            emissiveIntensity: 0.2
        });

        this.mainTriangle = new THREE.Mesh(mainGeometry, material);
        this.mainTriangle.position.z = 2;

        // Create inner triangle with new geometry
        const innerGeometry = new THREE.BufferGeometry();
        const innerVertices = new Float32Array([
            // Inner triangle (slightly smaller)
            0, size * 0.9, 0.1,           // top
            -size * 0.78, -0.45 * size, 0.1,  // bottom left
            size * 0.78, -0.45 * size, 0.1    // bottom right
        ]);
        
        innerGeometry.setAttribute('position', new THREE.BufferAttribute(innerVertices, 3));
        innerGeometry.computeVertexNormals();

        // Create gradient for inner triangle
        const innerCanvas = document.createElement('canvas');
        const innerContext = innerCanvas.getContext('2d');
        innerCanvas.width = 1024;
        innerCanvas.height = 1024;
        
        const innerGradient = innerContext.createRadialGradient(
            innerCanvas.width * 0.5, innerCanvas.height * 0.5, 0,
            innerCanvas.width * 0.5, innerCanvas.height * 0.5, innerCanvas.width * 0.7
        );
        
        innerGradient.addColorStop(0, '#14002B');    // Dark core
        innerGradient.addColorStop(0.2, '#2E0854');  // Deep purple
        innerGradient.addColorStop(0.4, '#480082');  // Rich purple
        innerGradient.addColorStop(0.7, '#6A00FF');  // Electric purple
        innerGradient.addColorStop(1, '#14002B');    // Dark edge
        
        innerContext.fillStyle = innerGradient;
        innerContext.fillRect(0, 0, innerCanvas.width, innerCanvas.height);

        const innerTexture = new THREE.CanvasTexture(innerCanvas);
        innerTexture.needsUpdate = true;

        const innerMaterial = new THREE.MeshPhysicalMaterial({
            map: innerTexture,
            transparent: true,
            opacity: 0.85,
            metalness: 0.8,
            roughness: 0.15,
            side: THREE.DoubleSide,
            envMapIntensity: 1.8,
            clearcoat: 0.3,
            clearcoatRoughness: 0.2,
            emissive: new THREE.Color(0x3D0082),
            emissiveIntensity: 0.15
        });

        this.subTriangle = new THREE.Mesh(innerGeometry, innerMaterial);
        this.subTriangle.rotation.z = Math.PI / 30; // 6 degrees rotation
        this.subTriangle.position.z = 2.02;
        
        // Add both triangles to the group
        this.group.add(this.mainTriangle);
        this.group.add(this.subTriangle);
    }

    update() {
        this.time += 0.001;
        
        // Update mouse movement with enhanced smoothing and increased sensitivity
        const targetX = this.scene.userData.mouseX || 0;
        const targetY = this.scene.userData.mouseY || 0;
        
        this.mouseSpeed.x += (targetX - this.mouseSpeed.x) * 0.15; // Increased from 0.1
        this.mouseSpeed.y += (targetY - this.mouseSpeed.y) * 0.15; // Increased from 0.1
        
        // Update layers with increased movement
        this.layers.forEach((layer, index) => {
            const { mesh, parallaxFactor } = layer;
            
            mesh.position.x += (this.mouseSpeed.x * 8 * parallaxFactor - mesh.position.x) * 0.06; // Increased from 6
            mesh.position.y += (this.mouseSpeed.y * 8 * parallaxFactor - mesh.position.y) * 0.06; // Increased from 6
            
            mesh.children.forEach(triangle => {
                triangle.rotation.x += triangle.userData.rotationSpeed * 1.2; // Increased rotation speed
                triangle.rotation.y += triangle.userData.rotationSpeed * 0.9;
                triangle.rotation.z += triangle.userData.rotationSpeed * 0.6;
            });
        });
        
        // Enhanced triangle movement and effects
        if (this.mainTriangle && this.subTriangle) {
            const mainScale = 1 + Math.sin(this.time * 1.8) * 0.08; // Increased scale variation
            const subScale = 1 + Math.cos(this.time * 1.8) * 0.08;
            
            this.mainTriangle.scale.set(mainScale, mainScale, 1);
            this.subTriangle.scale.set(subScale, subScale, 1);
            
            // Increased parallax movement
            const parallaxX = this.mouseSpeed.x * 3.5; // Increased from 2.5
            const parallaxY = this.mouseSpeed.y * 3.5; // Increased from 2.5
            
            this.mainTriangle.position.x = parallaxX;
            this.mainTriangle.position.y = parallaxY;
            
            this.subTriangle.position.x = parallaxX * 1.4; // Increased from 1.25
            this.subTriangle.position.y = parallaxY * 1.4; // Increased from 1.25
            
            // Increased movement intensity for effects
            const movementIntensity = Math.sqrt(parallaxX * parallaxX + parallaxY * parallaxY) * 1.5; // Increased from 1.2
            
            // Enhanced color shift based on movement
            const colorShiftX = (parallaxX * 0.5 + Math.sin(this.time)) * 0.5; // Increased from 0.4
            const colorShiftY = (parallaxY * 0.5 + Math.cos(this.time)) * 0.5; // Increased from 0.4
            
            this.mainTriangle.material.map.offset.x = colorShiftX;
            this.mainTriangle.material.map.offset.y = colorShiftY;
            
            this.subTriangle.material.map.offset.x = -colorShiftX * 1.1; // Increased from 0.9
            this.subTriangle.material.map.offset.y = -colorShiftY * 1.1; // Increased from 0.9
            
            // Smooth material property transitions
            const baseIntensity = 2.5; // Increased from 2.0
            this.mainTriangle.material.envMapIntensity = baseIntensity + movementIntensity * 0.7; // Increased from 0.5
            this.subTriangle.material.envMapIntensity = baseIntensity + movementIntensity * 0.6; // Increased from 0.4
            
            // Enhanced rotation
            this.mainTriangle.rotation.z += 0.001 + movementIntensity * 0.008; // Increased from 0.005
            this.subTriangle.rotation.z += 0.0012 + movementIntensity * 0.008; // Increased from 0.005
            
            // Enhanced opacity changes
            const baseOpacity = 0.92;
            this.mainTriangle.material.opacity = baseOpacity - movementIntensity * 0.1; // Increased fade effect
            this.subTriangle.material.opacity = (baseOpacity - 0.07) - movementIntensity * 0.08;
        }
    }
}
