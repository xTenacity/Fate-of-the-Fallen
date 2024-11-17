const player = new Player(200, 200);
const map = new Map();
const projManager = new ProjectileManager();
const itemManager = new ItemManager();
const camera = new Camera();

fetch("GameObj/items/items.json")
.then(response => response.json())
.then(data => {
    //itemManager.addItem(data.weapons.guns.find(item => item.name === "Pistol"));
    //itemManager.addItem(data.weapons.guns.find(item => item.name === "Rune Save"));
    //itemManager.addItem(data.weapons.guns.find(item => item.name === "Shotgun"));
    //itemManager.addItem(data.weapons.guns.find(item => item.name === "Singularity Rail Cannon"));
    //itemManager.addItem(data.weapons.guns.find(item => item.name === "Aquagun"));
    //itemManager.addItem(data.weapons.guns.find(item => item.name === "Holy Striker"));
    //itemManager.addItem(data.weapons.guns.find(item => item.name === "Eviscerator"));
    itemManager.addItem(data.weapons.guns.find(item => item.name === "andrew killa"));
    itemManager.addItem(data.weapons.guns.find(item => item.name === "pulse bomb"));
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
    render();
}