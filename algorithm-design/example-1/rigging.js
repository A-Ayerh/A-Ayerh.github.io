export class Rigging {
    constructor(scene) {
        this.scene = scene;
        this.bodyGroup = new THREE.Group();
        this.createHuman();
        this.scene.add(this.bodyGroup);
    }

    createHuman() {
        const humanMaterial = new THREE.MeshPhongMaterial({
            color: 0xc0c0c0,   // Light gray color
            transparent: false, // Remove transparency for full visibility
            opacity: 1,         // Fully opaque
            emissive: 0x404040, // Emissive color
            emissiveIntensity: 0.4, // Lower emissive intensity
            flatShading: true
        });

        // Head (Sphere)
        const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const headMesh = new THREE.Mesh(headGeometry, humanMaterial);
        headMesh.position.set(0, 2.2, 0);
        this.bodyGroup.add(headMesh);

        // Torso (Box)
        const torsoGeometry = new THREE.BoxGeometry(1, 1.5, 0.6);
        const torsoMesh = new THREE.Mesh(torsoGeometry, humanMaterial);
        torsoMesh.position.set(0, 1, 0);
        this.bodyGroup.add(torsoMesh);

        // Arms (Cylinders)
        const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 32);
        
        const leftArm = new THREE.Mesh(armGeometry, humanMaterial);
        leftArm.position.set(-0.9, 1.5, 0);
        leftArm.rotation.z = Math.PI / 8;
        this.bodyGroup.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, humanMaterial);
        rightArm.position.set(0.9, 1.5, 0);
        rightArm.rotation.z = -Math.PI / 8;
        this.bodyGroup.add(rightArm);

        // Legs (Cylinders)
        const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 32);
        
        const leftLeg = new THREE.Mesh(legGeometry, humanMaterial);
        leftLeg.position.set(-0.4, -0.5, 0);
        this.bodyGroup.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, humanMaterial);
        rightLeg.position.set(0.4, -0.5, 0);
        this.bodyGroup.add(rightLeg);

        // Pink Brain inside the head (optional, you can remove if not needed)
        const brainMaterial = new THREE.MeshPhongMaterial({
            color: 0xffc0cb, // Pink color
            emissive: 0xff5f5f,
            emissiveIntensity: 0.4
        });

        const brainGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const brainMesh = new THREE.Mesh(brainGeometry, brainMaterial);
        brainMesh.position.set(0, 2.3, 0);
        this.bodyGroup.add(brainMesh);
    }
}
