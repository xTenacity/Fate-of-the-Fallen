const player = new Player(25, 5);
let map = new Map("pride","room1");
let currentRoom = "room1";
const projManager = new ProjectileManager();
const slashManager = new SlashManager();
const itemManager = new ItemManager();
const camera = new Camera();
let theme = "default";

function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);
    if (currentTime - lastFrameTime >= (1000/fps)) {
        lastFrameTime = currentTime;
        updateScreen();
    }
}

function updateScreen() {
    player.move();
    projManager.updateProjectiles();
    slashManager.updateSlashes();
    render();
}