// animation.js

export class Animation {
    constructor(bodyGroup, camera) {
        this.bodyGroup = bodyGroup; // Reference to the 3D human figure group
        this.camera = camera; // Reference to the camera that will follow the character
        this.speed = 0.05; // Speed of movement
        // Direction vector for character movement, randomly initialized and normalized
        this.direction = new THREE.Vector3(1, 0, 0).normalize(); // Start with a fixed direction to avoid upside-down state
        this.touchingWall = false; // Boolean to check if character is touching a wall
        this.pauseTime = 0; // Time reference for pausing at the wall
        this.bounceComplete = false; // Boolean to indicate whether the character finished bouncing off the wall
        this.rotatingCamera = false; // Boolean to indicate if the camera is currently rotating around the character
        this.rotateDuration = 2000; // Duration of the camera rotation (default: 2 seconds)
        this.targetAngle = 0; // Target angle for the current rotation
        this.currentAngle = 0; // Current angle during incremental camera rotation
    }

    update() {
        // Decide which action to perform based on the current state
        if (!this.touchingWall && !this.bounceComplete && !this.rotatingCamera) {
            // Character is freely moving
            this.moveCharacter();
        } else if (this.touchingWall && !this.bounceComplete && !this.rotatingCamera) {
            // Character pauses when it hits the wall
            this.pauseBeforeBounce();
        } else if (this.bounceComplete && this.rotatingCamera) {
            // Rotate the camera around the character
            this.rotateCamera();
        }

        // Gentle rocking side to side to give the character a natural motion effect
        this.bodyGroup.rotation.z = Math.sin(Date.now() * 0.001) * 0.05;
        this.bodyGroup.rotation.x = 0; // Ensure character is upright
        this.bodyGroup.rotation.y = 0; // Ensure character is not twisted
    }

    moveCharacter() {
        // Move character in the current direction by scaling the direction vector by speed
        this.bodyGroup.position.addScaledVector(this.direction, this.speed);
        // Ensure character is always looking in the direction of movement
        this.bodyGroup.lookAt(this.bodyGroup.position.clone().add(this.direction.setY(0))); // Prevents character from flipping upside down

        // Update camera position to follow the character from a third-person perspective
        this.camera.position.set(
            this.bodyGroup.position.x - this.direction.x * 10, // Offset by direction to keep distance
            this.bodyGroup.position.y + 12, // Increase camera height for a better view
            this.bodyGroup.position.z - this.direction.z * 10 // Offset by direction to keep distance
        );
        // Make sure the camera is always looking at the character
        this.camera.lookAt(this.bodyGroup.position);

        // Check if the character is near the edge of the area (limits at +/- 14 units)
        if (Math.abs(this.bodyGroup.position.x) > 14 || Math.abs(this.bodyGroup.position.z) > 14) {
            this.speed = 0.02; // Slow down when near the edge to simulate caution
            this.touchingWall = true; // Mark that character is touching the wall
            this.pauseTime = Date.now(); // Record the time at which the character touched the wall
        }
    }

    pauseBeforeBounce() {
        // Pause the character for 500ms when it touches the wall
        if (Date.now() - this.pauseTime > 500) { // Check if 500ms has passed
            this.touchingWall = false; // No longer touching the wall
            this.bounceComplete = true; // Set bounce complete to true to initiate the camera rotation
            this.rotatingCamera = true; // Start rotating the camera
            this.speed = 0.05; // Reset speed after bouncing off
            // Change direction to move towards the center (opposite of current position)
            this.direction = new THREE.Vector3(-this.bodyGroup.position.x, 0, -this.bodyGroup.position.z).normalize();
        }
    }

    rotateCamera() {
        const radius = 20; // Radius of the camera's circular path
        const rotationStep = Math.PI / 180; // Rotate by 1 degree per frame

        // Function to perform the rotation
        const rotate = () => {
            if (this.currentAngle < Math.PI * 2) { // Complete one full rotation (360 degrees)
                // Increment the angle by a small step
                this.currentAngle += rotationStep;
                // Update the camera's position to move around the character in a circle
                this.camera.position.x = this.bodyGroup.position.x + Math.cos(this.currentAngle) * radius;
                this.camera.position.y = Math.max(this.bodyGroup.position.y + 15, 5); // Prevents camera from going below character height // Keep the camera at an elevated height
                this.camera.position.z = this.bodyGroup.position.z + Math.sin(this.currentAngle) * radius;
                // Ensure the camera is always looking at the character
                this.camera.lookAt(this.bodyGroup.position);
                // Request the next frame for smooth animation
                requestAnimationFrame(rotate);
            } else {
                // After rotation is complete, reset flags to allow movement to continue
                this.currentAngle = 0; // Reset the angle for future rotations
                this.rotatingCamera = false;
                this.bounceComplete = false; 
            }
        };
        // Start the rotation
        rotate();
    }
}
