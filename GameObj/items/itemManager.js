class ItemManager {
    constructor() {
        this.items = [];
        this.currentItem = 0;
        this.itemCooldown = 0;
    }
    
    //SETTERS
    addItem(item) {
        this.items.push(item);
    }
    nextItem() {
        if (this.currentItem < this.items.length-1) {
            this.currentItem++;
        } else {
            this.currentItem = 0;
        }
    }
    useItem() {
        if (this.getType() == "Gun") {
            this.shoot(player.x, player.y);
        } else if (this.getType() == "Sword") {
            this.slash(player.x, player.y);
        }
    }


    //GETTERS
    getItem() {
        return this.items[this.currentItem];
    }
    getName() {
        return this.items[this.currentItem].name;
    }
    getType() {
        return this.items[this.currentItem].type;
    }
    
    
    slash(x, y) {
        let cItem = this.items[this.currentItem];
        if (clicking && this.itemCooldown == 0) {
            let attack = cItem.attacks[cItem.cStage];
            this.itemCooldown = attack.delay;
            let angle = Math.atan2(mousey+camera.y - y, mousex+camera.x - x);
            slashManager.createSlash(x,y,angle,attack.side,attack.color,cItem.swingSpeed,attack.size);

            if (cItem.cStage < cItem.attacks.length - 1) {
                cItem.cStage++;
            } else {
                cItem.cStage = 0;
            }
        }
    }
//GUN SPECIFIC METHODS
    getBullets() {
        return this.items[this.currentItem].bullets;
    }
    getMagSize() {
        return this.items[this.currentItem].magSize;
    }
    reload() {
        this.items[this.currentItem].bullets = this.items[this.currentItem].magSize;
    }
    applyRecoil(recoil, dir) {
        camera.shake(Math.abs(recoil/2));
        player.xvelo -= recoil*Math.cos(dir);
        player.yvelo -= recoil*Math.sin(dir);
    }
    shoot(x, y) {
        let cItem = this.items[this.currentItem];
        if (clicking && this.itemCooldown <= 0 && cItem.bullets > 0) {
            //set cooldown and decrease bullets
            this.itemCooldown = cItem.rateOfFire;
            this.items[this.currentItem].bullets--;
            
            //set the angle & apply recoil
            let angle = Math.atan2(mousey+camera.y - y, mousex+camera.x - x);
            this.applyRecoil(cItem.recoil, angle);

            //create bullets
            this.createBullet(x, y, angle);
        } 
    }
    createBullet(x, y, angle) {
        let cItem = this.items[this.currentItem];

        /*var audio = new Audio("GameObj/items/sounds/" + cItem.shootSfx + ".mp3");
        audio.play();*/

        if (cItem.fx) {
            const fxList = Array.isArray(cItem.fx) ? cItem.fx : [cItem.fx]; // Ensure fx is an array
            for (let i = 0; i < cItem.bulletsPerShot; i++) {
                let bulletSpeed = cItem.bulletSpeed + (cItem.bulletDelay ? i : 0);
                let effectApplied = false;

                let bulletX = x - (cItem.bulletSize/2);
                let bulletY = y - (cItem.bulletSize/2);
                let bulletAngle = angle;
                let colorchange = false;

                /*if (effect == "colorchange")*/
                for (let effect of fxList) {
                    if (effect == "cursor") {
                        bulletX = mousex + camera.x;
                        bulletY = mousey + camera.y;
                        effectApplied = true;
                    } if (!isNaN(effect)) { 
                        const backwardX = bulletX - effect * Math.cos(bulletAngle + Math.PI);
                        const backwardY = bulletY - effect * Math.sin(bulletAngle + Math.PI);
                        const spreadFactor = (i % 2 == 0 ? 1 : -1); // Alternate sides
                        const offsetX = 10 * (Math.round(i/2)*2 + Math.round(Math.abs(effect)/25)) * spreadFactor * Math.cos(bulletAngle + Math.PI / 2);
                        const offsetY = 10 * (Math.round(i/2)*2 + Math.round(Math.abs(effect)/25)) * spreadFactor * Math.sin(bulletAngle + Math.PI / 2);

                        bulletX = backwardX + offsetX;
                        bulletY = backwardY + offsetY;
                        bulletAngle = Math.atan2(mousey+camera.y - bulletY, mousex+camera.x - bulletX);
                        effectApplied = true;
                    } else if (effect == "random") {
                        bulletX = ((Math.random()>0.5)?1:-1) * Math.random()*1000 + x;
                        bulletY = ((Math.random()>0.5)?1:-1) * Math.random()*1000 + y;
                        bulletAngle = Math.atan2(mousey+camera.y - bullety, mousex+camera.x - bulletX);
                        effectApplied = true;
                    } else if (effect == "colorchange") {
                        colorchange = true;
                    }
                }
                if (colorchange) {
                    projManager.createProjectile(
                        bulletX,
                        bulletY,
                        bulletAngle,
                        ((i%2==0) ? cItem.color2 : cItem.color),
                        cItem.spread,
                        cItem.lifespan,
                        cItem.bulletSize,
                        bulletSpeed,
                        cItem.bulletsPerShot,
                        cItem.acceleration
                    );
                } else {
                    projManager.createProjectile(
                        bulletX,
                        bulletY,
                        bulletAngle,
                        cItem.color,
                        cItem.spread,
                        cItem.lifespan,
                        cItem.bulletSize,
                        bulletSpeed,
                        cItem.bulletsPerShot,
                        cItem.acceleration
                    );
                }
            }
        } else { 
            for (let i = 0; i < cItem.bulletsPerShot; i++) {
                let bulletSpeed = cItem.bulletSpeed + (cItem.bulletDelay ? i : 0);
                projManager.createProjectile(
                    x,
                    y,
                    angle,
                    cItem.color,
                    cItem.spread,
                    cItem.lifespan,
                    cItem.bulletSize,
                    bulletSpeed,
                    cItem.bulletsPerShot,
                    cItem.acceleration
                );
            }
        }
    }
}