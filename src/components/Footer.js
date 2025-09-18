import * as THREE from 'three';

export class Footer {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.scene.add(this.group);
        
        // Position the footer at the bottom
        this.group.position.y = -6;  // Move lower
        this.group.position.z = -2;  // Bring forward
        
        this.createFooter();
    }

    createFooter() {
        // Create social media icons using basic shapes
        const iconGeometry = new THREE.BoxGeometry(1.2, 1.2, 0.2);  // Larger icons
        const iconMaterials = [
            new THREE.MeshPhongMaterial({ 
                color: 0x1DA1F2,
                emissive: 0x1DA1F2,
                emissiveIntensity: 0.2,
                shininess: 80
            }), // Twitter/X
            new THREE.MeshPhongMaterial({ 
                color: 0x0077B5,
                emissive: 0x0077B5,
                emissiveIntensity: 0.2,
                shininess: 80
            }), // LinkedIn
            new THREE.MeshPhongMaterial({ 
                color: 0x6e5494,
                emissive: 0x6e5494,
                emissiveIntensity: 0.2,
                shininess: 80
            })  // GitHub
        ];

        const icons = ['Twitter', 'LinkedIn', 'GitHub'].map((platform, index) => {
            const mesh = new THREE.Mesh(iconGeometry, iconMaterials[index]);
            mesh.position.x = (index - 1) * 3;  // Space them out more
            
            // Add hover effect
            mesh.userData = { 
                originalColor: iconMaterials[index].color.getHex(),
                platform: platform
            };
            
            mesh.addEventListener('mouseover', () => {
                mesh.material.color.setHex(0x00ff88);
                document.body.style.cursor = 'pointer';
            });
            
            mesh.addEventListener('mouseout', () => {
                mesh.material.color.setHex(mesh.userData.originalColor);
                document.body.style.cursor = 'default';
            });
            
            mesh.addEventListener('click', () => {
                // Add your social media links here
                const urls = {
                    'Twitter': 'https://twitter.com',
                    'LinkedIn': 'https://linkedin.com',
                    'GitHub': 'https://github.com'
                };
                window.open(urls[platform], '_blank');
            });
            
            return mesh;
        });

        icons.forEach(icon => this.group.add(icon));
    }

    update() {
        // Add subtle floating animation
        this.group.position.y = -4 + Math.sin(Date.now() * 0.001) * 0.1;
    }
} 