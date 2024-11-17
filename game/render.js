const lerpFactor = 0.1;
function updateCamera() {
    // Center the camera on the player
    let targetX = player.x - camera.width / 2;
    let targetY = player.y - camera.height / 2;
    if (camPos == "cursor") {
        targetX = (mousex+camera.x) - camera.width / 2;
        targetY = (mousey+camera.y) - camera.height / 2;
    }

    // Apply linear interpolation to move the camera gradually toward the target
    camera.x += (targetX - camera.x) * lerpFactor;
    camera.y += (targetY - camera.y) * lerpFactor;

    // Optional: Clamp the camera within the game world boundaries
    const worldWidth = screenSize;  // Adjust to your actual game world width
    const worldHeight = screenSize; // Adjust to your actual game world height
    camera.x = Math.max(0, Math.min(camera.x, worldWidth - camera.width));
    camera.y = Math.max(0, Math.min(camera.y, worldHeight - camera.height));
    
    if (camera.shakeFactor > 0) {
        // Apply random offset based on shakeIntensity
        const offsetX = (Math.random() - 0.5) * 2 * camera.shakeFactor;
        const offsetY = (Math.random() - 0.5) * 2 * camera.shakeFactor;
        
        camera.x += offsetX;
        camera.y += offsetY;

        // Increment the shake timer
        camera.shakeFactor *= 0.9;
        if (camera.shakeFactor < 1) {
            camera.shakeFactor = 0;
        }
    }
}

function drawBG() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    if (player.isDashing) {
        //trail = [];
        drawFadingTrail();
    }
    ctx.fillStyle = player.color;
    ctx.fillRect(
        player.x - camera.x - (player.size*camera.zoom) / 2,
        player.y - camera.y - (player.size*camera.zoom) / 2,
        player.size*camera.zoom,
        player.size*camera.zoom
    );
}

function drawProjectiles() {
    for (let projectile in projManager.projectiles) {
        let proj = projManager.projectiles[projectile];
        ctx.fillStyle = proj.color;
        ctx.fillRect(
            proj.x - camera.x - (proj.size*camera.zoom) / 2,
            proj.y - camera.y - (proj.size*camera.zoom) / 2,
            proj.size*camera.zoom,
            proj.size*camera.zoom
        );
        projectileTrail(proj);
    }
;}

function projectileTrail(proj) {
    let projectileAlpha = 1;
    for (let i = 1; i < 10; i++) {
        ctx.fillStyle = proj.color;
        hex = ctx.fillStyle.replace(/^#/, '');
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${projectileAlpha})`;
        ctx.fillRect(
            proj.x - 0.5*proj.speed*Math.cos(proj.dir)*(i/4) - camera.x - (proj.size*camera.zoom) / 2,
            proj.y - 0.5*proj.speed*Math.sin(proj.dir)*(i/4) - camera.y - (proj.size*camera.zoom) / 2,
            proj.size*camera.zoom,
            proj.size*camera.zoom
        );
        projectileAlpha *= 0.7; // Control the fade between segments
    }
}


function drawFadingTrail() {
    // Start with a high alpha and decrease it
    let playerAlpha = 1.0;

    for (let i = 0; i < 20; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${playerAlpha})`;
        ctx.fillRect(
            player.x - player.xvelo*(i/4) - camera.x - (player.size*camera.zoom) / 2,
            player.y - player.yvelo*(i/4) - camera.y - (player.size*camera.zoom) / 2,
            player.size*camera.zoom,
            player.size*camera.zoom
        );
        playerAlpha *= 0.7; // Control the fade between segments
    }
}


function drawGrid() {
    ctx.strokeStyle = `rgba(255, 0, 0, 0.5)`;// Color of the grid lines
    ctx.lineWidth = 1; // Thickness of the grid lines

    // Calculate where to start and end the grid based on the camera position
    const startX = -camera.x % player.size;
    const startY = -camera.y % player.size;

    // Draw vertical lines
    for (let x = startX; x < canvas.width; x += player.size * camera.zoom) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = startY; y < canvas.height; y += player.size * camera.zoom) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function render() {
    updateCamera();
    drawBG();
    drawGrid();
    drawProjectiles();
    drawPlayer();
    drawUI();
    drawCrosshair();
}