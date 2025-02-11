function drawUI() { //draw the screen
    drawText(Math.round(player.x) + ", " + Math.round(player.y), 20, textSize*2);
    drawText(Math.round(player.xvelo*100)/100 + ", " + Math.round(player.yvelo*100)/100, 20, textSize*3);
    drawText("dash: " + player.dashCooldown + "/" + player.dashDelay, 20, textSize*4);
    if (itemManager.getItem()) {
        drawText(itemManager.getName(), 20, ctx.canvas.height - 40);
        drawText(itemManager.getBullets() + "/" + itemManager.getMagSize(), 20, ctx.canvas.height - 20);
    } 
    drawText("projectiles loaded: " + projManager.projectiles.length, ctx.canvas.width-250, textSize*2);
    drawText("FPS: " + fps, ctx.canvas.width-200, textSize*3);
    drawText("WASD to move", ctx.canvas.width-200, ctx.canvas.height - 100);
    drawText("e to tp", ctx.canvas.width-200, ctx.canvas.height - 80);
    drawText("lmb to shoot", ctx.canvas.width-200, ctx.canvas.height - 60);
    drawText("t to switch weapons", ctx.canvas.width-200, ctx.canvas.height - 40);
    drawText("r to reload", ctx.canvas.width-200, ctx.canvas.height - 20);
}

function drawText(message,x,y) {
    ctx.fillStyle = "white";
    const offsetX = (Math.random() - 0.5) * 2 * camera.shakeFactor;
    const offsetY = (Math.random() - 0.5) * 2 * camera.shakeFactor;
    ctx.fillText(message,x + offsetX,y + offsetY);
}

function drawCrosshair() {
    let a = 1;
    ctx.fillStyle = "white";
    
    if (itemManager.itemCooldown > 0) ctx.fillStyle = "lightgrey", a*=2;
    
    if (Math.round(camera.shakeFactor/10) > 1) {
        a*=Math.round(camera.shakeFactor/10);
    }
    /*if (player.items.length > 0) {
        if (pKey[0] || pKey[1] || pKey[2] || pKey[3]) {
            a *= (Math.abs(player.xvelo) > Math.abs(player.yvelo)) ? Math.abs(Math.round(player.xvelo)) : Math.abs(Math.round(player.yvelo));
            if (player.items[player.currentItem] == "Shotgun") a*=0.5;
        }
        if (player.items[player.currentItem].name == "Shotgun") a*=10;
    } else {
        a = -5;
    }*/
    if (pKey[0] || pKey[1] || pKey[2] || pKey[3]) {
        a *= (Math.abs(player.xvelo) > Math.abs(player.yvelo)) ? Math.abs(Math.round(player.xvelo)) : Math.abs(Math.round(player.yvelo));
    }
    //a = -5;
    
    const offsetX = (Math.random() - 0.5) * 2 * camera.shakeFactor;
    const offsetY = (Math.random() - 0.5) * 2 * camera.shakeFactor;
    ctx.fillRect(mousex-10-a + offsetX, mousey-a + offsetY, 10,5);
    ctx.fillRect(mousex-5-a + offsetX, mousey-5-a + offsetY, 5,5);
    ctx.fillRect(mousex+5+a + offsetX, mousey-a + offsetY, 10,5);
    ctx.fillRect(mousex+5+a + offsetX, mousey-5-a + offsetY, 5, 5);
    ctx.fillRect(mousex-10-a + offsetX, mousey+10+a + offsetY, 10,5);
    ctx.fillRect(mousex-5-a + offsetX, mousey+15+a + offsetY, 5,5);
    ctx.fillRect(mousex+5+a + offsetX, mousey+10+a + offsetY, 10,5);
    ctx.fillRect(mousex+5+a + offsetX, mousey+15+a + offsetY, 5, 5);
}