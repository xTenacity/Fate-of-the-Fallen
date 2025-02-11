function checkInput(key, event) {
    if (event == "down") {
        if (key == "w") { //up
            pKey[0] = true;
        }
        if (key == "a") { //left
            pKey[1] = true;
        }
        if (key == "s") { //down
            pKey[2] = true;
        }
        if (key == "d") { //right
            pKey[3] = true;
        }
        if (key == "shift") {
            player.dash();
        }
        if (key == "e") {
            player.tp();
        }
        if (key == "t") {
            itemManager.nextItem();
        }
        if (key == "r") {
            itemManager.reload();
        }
        if (key == "p") {
            camPos = "cursor";
        }
        //needs to be refactored
        /*
        if (key == "-") {
            camera.zoom-=0.5;
        }
        if (key == "=") {
            camera.zoom+=0.5;
        }*/
    } else {
        if (key == "w") { //up
            pKey[0] = false;
        }
        if (key == "a") { //left
            pKey[1] = false;
        }
        if (key == "s") { //down
            pKey[2] = false;
        }
        if (key == "d") { //right
            pKey[3] = false;
        }
        if (key == "p") {
            camPos = "player";
        }
    }
}
function keydown(event) {
    checkInput(event.key.toLowerCase(), "down");
}
function keyup(event) {
    checkInput(event.key.toLowerCase(), "up");
}
function mousemove(event) {
    mousex = event.clientX;
    mousey = event.clientY;
}
function mousedown(event) {
    clicking = true;
    if (itemManager.items.length > 0) {
        let cItem = itemManager.items[itemManager.currentItem];
        if (cItem.type == "Gun") {
            if (cItem.bullets <= 0) {
                /*var audio = new Audio("GameObj/items/sounds/" + cItem.emptyMagSfx + ".mp3");
                audio.play();*/
            }
        }
    }
}
function mouseup(event) {
    clicking = false;
    if (itemManager.items.length > 0) {
        let cItem = itemManager.items[itemManager.currentItem];
        if (cItem.type == "Sword") {
            cItem.cStage = 0;
        }
    }
}