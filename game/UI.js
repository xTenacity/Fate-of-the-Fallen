function drawUI() { //draw the screen
    ctx.fillText(player.x + ", " + player.y, 20, textSize*2);
    ctx.fillText(player.xvelo + ", " + player.yvelo, 20, textSize*3);
    ctx.fillText("isDashing: " + player.isDashing, 20, textSize*4);
    ctx.fillText("dash: " + player.dashCooldown + "/" + player.dashDelay, 20, textSize*5);
    ctx.fillText("tp: " + player.tpCooldown + "/" + player.tpDelay, 20, textSize*6);
    ctx.fillText("shootType: " + player.shootTypeList[player.shootType], 20, textSize*7);
    ctx.fillText("shots: " + player.shots, 20, textSize*8);
    ctx.fillText(player.bullets, player.x-5, player.y-25);
    let spread = player.accuracy;
    if (pKey[0] || pKey[1] || pKey[2] || pKey[3]) {
        spread/=2.5;
    }
    ctx.fillText("accuracy: " + spread, 20, textSize*9);

    let a = 1;
    
    ctx.fillStyle = "black";
    if (player.shootDelay != 0) {
        ctx.fillStyle = "grey";
        a*=2;
    } 
    if (pKey[0] || pKey[1] || pKey[2] || pKey[3]) {
        a*=3;
        if (player.shootTypeList[player.shootType] == "shotgun") {
            a*=0.5;
        }
    }
    if (player.shootTypeList[player.shootType] == "shotgun") {
        a*=10;
    }
    ctx.fillRect(mousex-10-a, mousey-a, 10,5);
    ctx.fillRect(mousex-5-a, mousey-5-a, 5,5);
    ctx.fillRect(mousex+5+a, mousey-a, 10,5);
    ctx.fillRect(mousex+5+a, mousey-5-a, 5, 5);
    ctx.fillRect(mousex-10-a, mousey+10+a, 10,5);
    ctx.fillRect(mousex-5-a, mousey+15+a, 5,5);
    ctx.fillRect(mousex+5+a, mousey+10+a, 10,5);
    ctx.fillRect(mousex+5+a, mousey+15+a, 5, 5);
}