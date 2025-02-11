const player = new Player(200, 200);
const map = new Map();
const projManager = new ProjectileManager();
const slashManager = new SlashManager();
const itemManager = new ItemManager();
const camera = new Camera();

fetch("GameObj/items/items.json")
    .then(response => response.json())
    .then(data => {
        // Iterate over all guns and add them to the item manager
        //data.weapons.guns.forEach(item => itemManager.addItem(item));
        data.weapons.melee.forEach(item => itemManager.addItem(item));
    })
    .catch(error => console.error("Error loading item data:", error));

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