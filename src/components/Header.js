import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export class Header {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.scene.add(this.group);
        
        // Position the header at the top, but closer to the camera
        this.group.position.y = 3;
        this.group.position.z = 2;  // In front of everything
        
        // Create menu items
        this.menuItems = ['Home', 'About', 'Projects', 'Contact'];
        this.meshes = new Map();
        this.createHeader();
    }

    async createHeader() {
        const loader = new FontLoader();
        
        try {
            const font = await loader.loadAsync('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');
            
            this.menuItems.forEach((item, index) => {
                const textGeometry = new TextGeometry(item, {
                    font: font,
                    size: 0.4,  // Slightly smaller
                    height: 0.01,
                });
                
                const textMaterial = new THREE.MeshBasicMaterial({ 
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.9
                });
                
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                
                // Position menu items horizontally with more spacing
                textMesh.position.x = (index - this.menuItems.length / 2) * 2;
                
                // Center each text item
                textGeometry.computeBoundingBox();
                const centerOffset = -(textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) / 2;
                textMesh.position.x += centerOffset;
                
                this.group.add(textMesh);
                this.meshes.set(item, textMesh);
                
                // Simple hover effect
                textMesh.userData = { 
                    originalColor: 0xffffff,
                    isActive: false
                };

                textMesh.addEventListener('mouseover', () => {
                    textMesh.material.color.setHex(0x00ff88);
                    document.body.style.cursor = 'pointer';
                });

                textMesh.addEventListener('mouseout', () => {
                    if (!textMesh.userData.isActive) {
                        textMesh.material.color.setHex(textMesh.userData.originalColor);
                        document.body.style.cursor = 'default';
                    }
                });

                textMesh.addEventListener('click', () => {
                    this.handleMenuClick(item);
                });
            });
        } catch (error) {
            console.error('Error loading font:', error);
        }
    }

    handleMenuClick(item) {
        // Reset all menu items
        this.meshes.forEach((mesh, menuItem) => {
            if (menuItem !== item) {
                mesh.material.color.setHex(mesh.userData.originalColor);
                mesh.userData.isActive = false;
            }
        });

        // Activate clicked item
        const mesh = this.meshes.get(item);
        mesh.userData.isActive = true;
        mesh.material.color.setHex(0x00ff88);

        // Handle navigation
        switch(item) {
            case 'Home':
                this.scene.getObjectByName('mainCamera')?.position.set(0, 0, 15);
                break;
            case 'About':
                console.log('About section clicked');
                break;
            case 'Projects':
                console.log('Projects section clicked');
                break;
            case 'Contact':
                console.log('Contact section clicked');
                break;
        }
    }

    update() {
        // No animation needed for header
    }
} 