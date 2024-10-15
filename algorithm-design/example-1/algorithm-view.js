function drawAlgorithm() {
    const canvas = document.getElementById("algorithmCanvas");
    const ctx = canvas.getContext("2d");

    // Draw "Calibration" box
    ctx.fillStyle = "#3498db"; // Blue color
    ctx.fillRect(50, 50, 300, 100); // Box position and size
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Calibration", 160, 110); // Text in the center

    // Draw "Preprocessing" box
    ctx.fillStyle = "#e74c3c"; // Red color
    ctx.fillRect(50, 200, 300, 100); // Box position and size
    ctx.fillStyle = "#fff";
    ctx.fillText("Preprocessing", 140, 260); // Text in the center
}
