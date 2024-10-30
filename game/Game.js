/*
0 - empty
1 - red block
2 - blue block
3 - green block
4 - yellow block
5 - controlled block
*/

const player = new Player(50, 50);
const map = new Map();

function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);
    if (currentTime - lastFrameTime >= (1000/fps)) {
        lastFrameTime = currentTime;
        updateScreen(currentTime);
    }
}

function updateScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - (player.size / 2), player.y - (player.size / 2), player.size, player.size);
    player.move();
    drawUI();
}