import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js';

export class Rigging {
    constructor(scene) {
        this.scene = scene;
        this.bodyGroup = new THREE.Group();
        this.createHuman();
        this.createBall(); // Add large stationary ball
        this.scene.add(this.bodyGroup);

        // Arm movement parameters
        this.maxArmRotation = Math.PI / 6; // Maximum arm rotation angle (30 degrees)
        this.minArmRotation = -Math.PI / 6; // Minimum arm rotation angle (-30 degrees)
        this.armRotationSpeed = 0.02;      // Speed of arm rotation
        this.armRotationDirection = 1;     // Direction of arm rotation

        // State control
        this.isWiping = true;              // Track whether the character is wiping or walking
    }

    createHuman() {
        const humanMaterial = new THREE.MeshPhongMaterial({
            color: 0xc0c0c0,
            transparent: false,
            opacity: 1,
            emissive: 0x404040,
            emissiveIntensity: 0.4,
            flatShading: true
        });

        // Head (Sphere)
        const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const headMesh = new THREE.Mesh(headGeometry, humanMaterial);
        headMesh.position.set(0, 2.2, 0);
        this.bodyGroup.add(headMesh);

        // Torso (Box)
        const torsoGeometry = new THREE.BoxGeometry(1.2, 2, 0.6); // Slightly bigger torso
        const torsoMesh = new THREE.Mesh(torsoGeometry, humanMaterial);
        torsoMesh.position.set(0, 1, 0);
        this.bodyGroup.add(torsoMesh);

        // Arms (without hands)
        this.rightArmGroup = this.createArm(humanMaterial, 0.9, 1.5, -Math.PI / 8); // Right arm
        this.createArm(humanMaterial, -0.9, 1.5, Math.PI / 8); // Left arm

        // Legs (Cylinders)
        const legGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1.8, 32);
        const leftLeg = new THREE.Mesh(legGeometry, humanMaterial);
        leftLeg.position.set(-0.4, -0.5, 0);
        this.bodyGroup.add(leftLeg);

        const rightLeg = new THREE.Mesh(legGeometry, humanMaterial);
        rightLeg.position.set(0.4, -0.5, 0);
        this.bodyGroup.add(rightLeg);
    }

    createArm(material, posX, posY, rotationZ) {
        const armGroup = new THREE.Group();

        // Create upper arm (Cylinder)
        const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 32);
        const upperArm = new THREE.Mesh(armGeometry, material);
        upperArm.position.set(0, -0.5, 0); // Position the upper arm relative to the group center
        upperArm.rotation.z = rotationZ;

        armGroup.add(upperArm);
        armGroup.position.set(posX, posY, 0); // Set the position of the arm group
        this.bodyGroup.add(armGroup);
        return armGroup;
    }

    // Create a large stationary ball (SphereGeometry)
    createBall() {
        const ballMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0000, // Red color for the ball
            transparent: true, // Enable transparency
            opacity: 0.3,     // Set opacity level for transparency
            emissive: 0x800000,
            emissiveIntensity: 0.5
        });
        const ballGeometry = new THREE.SphereGeometry(2.5, 32, 32); // Larger sphere for ball
        this.ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
        this.ballMesh.position.set(2, 1, 0); // Position in front of the character, slightly higher
        this.scene.add(this.ballMesh);
    }

    // Animate the arm movement for wiping motion
    animate() {
        requestAnimationFrame(() => this.animate());

        // Arm rotation for wiping
        this.rightArmGroup.rotation.z += this.armRotationSpeed * this.armRotationDirection;

        // Reverse the arm rotation direction when reaching the limits
        if (this.rightArmGroup.rotation.z > this.maxArmRotation || this.rightArmGroup.rotation.z < this.minArmRotation) {
            this.armRotationDirection *= -1;
        }

        // Render the scene
        this.scene.renderer.render(this.scene, this.scene.camera);
    }
}
