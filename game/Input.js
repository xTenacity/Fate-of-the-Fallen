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
        if (key == " ") {
            player.dash();
        }
        if (key == "e") {
            player.tp();
        }
        if (key == "t") {
            if (player.shootType < player.shootTypeList.length-1) {
                player.shootType++;
            } else {
                player.shootType = 0;
            }
        }
        if (key == "=") {
            player.shots++;
        }
        if (key == "-") {
            if (player.shots>1) {
                player.shots--;
            }
        }
        if (key == "r") {
            player.bullets=100;
        }
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
    }
}
function keydown(event) {
    checkInput(event.key, "down");
}
function keyup(event) {
    checkInput(event.key, "up");
}
function mousemove(event) {
    mousex = event.clientX;
    mousey = event.clientY;
}
function mousedown(event) {
    clicking = true;
}
function mouseup(event) {
    clicking = false;
}