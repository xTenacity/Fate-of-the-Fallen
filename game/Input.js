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