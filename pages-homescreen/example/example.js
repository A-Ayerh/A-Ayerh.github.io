// example.js

import { Rigging } from './rigging.js';
import { Animation } from './animation.js';

export class Example {
    constructor() {
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initLights();
        this.createControlButton();

        this.rigging = new Rigging(this.scene);
        this.animation = new Animation(this.rigging.bodyGroup, this.camera);

        this.handleResize();
        this.isAnimating = false;
        this.animationFrameId = null;
        
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x2c2c2c);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
        this.camera.position.set(4, 6, 8);
        this.camera.lookAt(0, 1, 0);
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(document.getElementById('threejs-container').clientWidth, 600);
        document.getElementById('threejs-container').appendChild(this.renderer.domElement);
    }

    initLights() {
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(10, 10, 10);
        this.scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
    }

    createControlButton() {
        const button = document.createElement('button');
        button.innerText = 'Start';
        button.id = 'controlButton';
        button.style.padding = '15px 30px';
        button.style.fontSize = '20px';
        button.style.border = '2px solid lightgreen';
        button.style.backgroundColor = 'darkgreen';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.5s ease';

        // Add light green glow effect
        button.style.boxShadow = '0 0 20px lightgreen';
        button.addEventListener('mouseover', () => {
            button.style.boxShadow = '0 0 40px lightgreen';
        });
        button.addEventListener('mouseout', () => {
            button.style.boxShadow = '0 0 20px lightgreen';
        });

        // Add click event to toggle animation
        button.addEventListener('click', () => {
            if (this.isAnimating) {
                this.stopAnimation(button);
            } else {
                this.startAnimation(button);
            }
        });

        document.getElementById('demo-section').appendChild(button);
    }

    startAnimation(button) {
        this.isAnimating = true;
        button.innerText = 'Stop';
        button.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        button.style.border = '2px solid red';
        button.style.boxShadow = '0 0 20px red';
        button.style.color = 'black';
        button.style.transition = 'all 0.5s ease';
    
        // Store the button animation reference so we can cancel it later
        this.pulseAnimation = button.animate([
            { opacity: 0.7, boxShadow: '0 0 20px red' },
            { opacity: 1, boxShadow: '0 0 40px red' }
        ], {
            duration: 1000,
            iterations: Infinity,
            direction: 'alternate'
        });
    
        // Start animation
        this.animate();
    }
    

    stopAnimation(button) {
        this.isAnimating = false;
        button.innerText = 'Start';
        button.style.backgroundColor = 'darkgreen';
        button.style.border = '2px solid lightgreen';
        button.style.boxShadow = '0 0 20px lightgreen';
        button.style.color = 'white';
        button.style.transition = 'all 0.5s ease';
    
        // Cancel the button's pulsing animation
        if (this.pulseAnimation) {
            this.pulseAnimation.cancel(); // Properly cancel the ongoing animation
        }
    
        // Cancel the animation frame
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null; // Reset the frame ID
        }
    }
    

    handleResize() {
        window.addEventListener('resize', () => {
            const width = document.getElementById('threejs-container').clientWidth;
            const height = 400;
            this.renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        });
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(() => this.animate());
        this.animation.update();  // Update animations
        this.renderer.render(this.scene, this.camera);
    }
}

new Example();  // Start the example