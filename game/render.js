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
        ctx.save();
        let proj = projManager.projectiles[projectile];
        ctx.fillStyle = proj.color;
        ctx.translate(proj.x - camera.x, proj.y - camera.y);
        ctx.rotate(proj.dir);

        switch(proj.ammo) {
            case "default":
                ctx.fillRect(
                    0,
                    0,
                    proj.size * camera.zoom,
                    proj.size * camera.zoom
                );
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(
                    0, // Center the circle at the projectile's position
                    0, // Center the circle at the projectile's position
                    proj.size * camera.zoom / 2, // Radius of the circle
                    0,                           // Start angle
                    2 * Math.PI                  // End angle
                );
                ctx.fill();
                break;
            case "blur": 
                projectileTrail(proj);
                break;
        }
        let cItem = itemManager.items[itemManager.currentItem];
        if (cItem.fx != null) {
            if (Array.isArray(cItem.fx)) {
                if (cItem.fx.includes("blur")) projectileTrail(proj);
            } else {
                if (cItem.fx == ("blur")) projectileTrail(proj);
            }
        }
        ctx.restore();
    }
}

function projectileTrail(proj) {
    let projAlpha = 1.0;
    const trailSegments = 5; // Number of trail segments
    const trailLength = proj.speed * 0.5; // Adjust for longer trails

    for (let i = 0; i < trailSegments; i++) {
        // Calculate offsets based on direction and segment
        const offsetX = trailLength * (i / trailSegments);

        ctx.save(); // Save the current canvas state
        ctx.translate(-offsetX, 0);
        
        ctx.fillStyle = proj.color;
        let bigint = parseInt(ctx.fillStyle.replace(/^#/, ''), 16);
        ctx.fillStyle = `rgba(
            ${(bigint >> 16) & 255},
            ${(bigint >> 8) & 255}, 
            ${bigint & 255}, 
            ${projAlpha}
        )`;

        if (proj.ammo == "default") {
            ctx.fillRect(
                0,
                0,
                proj.size * camera.zoom,
                proj.size * camera.zoom
            );
        } else if (proj.ammo == "circle") {
            ctx.beginPath();
            ctx.arc(
                0,
                0,
                proj.size * camera.zoom / 2, // Radius of the circle
                0,                           // Start angle
                2 * Math.PI                  // End angle
            );
            ctx.fill();
        }
        projAlpha *= 0.7; // Fade between trail segments
        ctx.restore();
    }
}

function drawSlashes() {
    for (let s of slashManager.slashes) {
        ctx.save();

        ctx.translate(player.x - camera.x, player.y - camera.y);
        ctx.rotate(s.currentAngle);


        drawSwingTrail(s);

        // Draw the slash blade
        ctx.fillStyle = s.color;
        const bladeLength = s.size * 10; // Adjust blade length
        const bladeWidth = 10 * camera.zoom; // Adjust blade width
        ctx.fillRect(
            0,                 // Start at arc's tip
            -bladeWidth / 2,   // Center the blade vertically
            bladeLength,       // Length of the blade
            bladeWidth         // Thickness of the blade
        );



        ctx.restore();
    }
}

function drawSwingTrail(s) {
    let slashAlpha = 0.9;
    const trailSegments = 10; // Number of trail segments
    const trailLength = 2;

    for (let i = 0; i < trailSegments; i++) {
        ctx.save(); // Save the current canvas state
        
        const trailAngle = (i * trailLength * s.speed); // Spread trail behind currentAngle
        const arcRadius = 10 * s.size * camera.zoom; // Size of the arc
        
        ctx.fillStyle = s.color;
        let bigint = parseInt(ctx.fillStyle.replace(/^#/, ''), 16);
        ctx.fillStyle = `rgba(
            ${(bigint >> 16) & 255},
            ${(bigint >> 8) & 255}, 
            ${bigint & 255}, 
            ${slashAlpha}
        )`;


        if (s.side == "left") {
            ctx.beginPath();
            ctx.arc(
                0,
                0,
                arcRadius,
                -(0.1*trailAngle),
                0,
            );
        } else if (s.side == "right") {
            ctx.beginPath();
            ctx.arc(
                0,
                0,
                arcRadius,
                0,
                (0.1*trailAngle)
            );
        }
        ctx.lineTo(0,0);

        ctx.fill();




        slashAlpha*=0.9;
        ctx.restore();
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
    drawSlashes();
    drawPlayer();
    drawUI();
    drawCrosshair();
}