// rigging.js

export class Rigging {
    constructor(scene) {
        this.scene = scene;
        this.bodyGroup = new THREE.Group();
        this.createHuman();
        this.addFloorAndWalls();
        this.scene.add(this.bodyGroup);
    }

    createHuman() {
        const humanMaterial = new THREE.MeshPhongMaterial({
            color: 0xc0c0c0,
            transparent: true,
            opacity: 0.3,
            emissive: 0x404040,
            emissiveIntensity: 0.6,
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

        // Pink Brain inside the head
        const brainMaterial = new THREE.MeshPhongMaterial({
            color: 0xffc0cb,
            emissive: 0xff5f5f,
            emissiveIntensity: 0.4
        });

        const brainGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const brainMesh = new THREE.Mesh(brainGeometry, brainMaterial);
        brainMesh.position.set(0, 2.3, 0);
        this.bodyGroup.add(brainMesh);
    }

    addFloorAndWalls() {
        // Add a grid-like ground plane
        const gridHelper = new THREE.GridHelper(30, 10, 0xffffff, 0xffffff);
        gridHelper.material.opacity = 0.2;
        gridHelper.material.transparent = true;
        gridHelper.position.set(0, -1, -5);
        this.scene.add(gridHelper);

        // Add walls to box in the character
        const wallMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });

        const wallThickness = 1;
        const wallHeight = 4;

        // Front wall
        const frontWallGeometry = new THREE.BoxGeometry(30, wallHeight, wallThickness);
        const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
        frontWall.position.set(0, wallHeight / 2 - 1, -15);
        this.scene.add(frontWall);

        // Back wall 
        const backWallGeometry = new THREE.BoxGeometry(30, wallHeight, wallThickness);
        const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        backWall.position.set(0, wallHeight / 2 - 1, 15);
        this.scene.add(backWall);

        // Left wall
        const leftWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, 30);
        const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
        leftWall.position.set(-15, wallHeight / 2 - 1, 0);
        this.scene.add(leftWall);

        // Right wall
        const rightWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, 30);
        const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
        rightWall.position.set(15, wallHeight / 2 - 1, 0);
        this.scene.add(rightWall);
    }
}
