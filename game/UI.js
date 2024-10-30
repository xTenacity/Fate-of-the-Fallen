function drawUI() { //draw the screen
    ctx.fillText(player.x + ", " + player.y, 20, textSize*2);
    ctx.fillText(player.xvelo + ", " + player.yvelo, 20, textSize*3);
    ctx.fillText("isDashing: " + player.isDashing, 20, textSize*4);
    ctx.fillText("dash: " + player.dashCooldown + "/" + player.dashDelay, 20, textSize*5);
    ctx.fillText("tp: " + player.tpCooldown + "/" + player.tpDelay, 20, textSize*6);
}