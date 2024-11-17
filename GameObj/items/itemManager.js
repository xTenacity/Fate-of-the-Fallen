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

        var audio = new Audio("GameObj/items/sounds/" + cItem.shootSfx + "mp3");
        audio.play();
        
        //create rest of bullets
        for (let i = 0; i < cItem.bulletsPerShot; i++) {
            let bulletSpeed = cItem.bulletSpeed + (cItem.bulletDelay ? i : 0);


            if (cItem.fx == "colorchange") { //colorchange
                this.colorChangeBullet(x,y,angle,bulletSpeed,i%2, cItem);

            } else if (cItem.fx > 0 || cItem.fx < 0) { //if its a number
                this.posBullet(x,y,angle,bulletSpeed, i, cItem.fx, cItem);


            } else if (cItem.fx == "random") {
                this.randBullet(bulletSpeed, cItem);

            } else if (cItem.fx == "cursorbomb") {
                this.cursorBomb(bulletSpeed, i, cItem);


            } else { //default
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
    cursorBomb(bulletSpeed, i, cItem) {
        projManager.createProjectile( 
            mousex+camera.x,
            mousey+camera.y,
            i*(Math.PI / 180),
            cItem.color,
            cItem.spread, 
            cItem.lifespan, 
            cItem.bulletSize, 
            bulletSpeed*2, 
            cItem.bulletsPerShot, 
            cItem.acceleration
        );
    }
    randBullet(bulletSpeed, cItem) {
        let randX = ((Math.random()>0.5)?1:-1) * Math.random()*1000 + player.x;
        let randY = ((Math.random()>0.5)?1:-1) * Math.random()*1000 + player.y;
        let a = Math.atan2(mousey+camera.y - randY, mousex+camera.x - randX);
        projManager.createProjectile( 
            randX,
            randY,
            a,
            cItem.color,
            cItem.spread, 
            cItem.lifespan, 
            cItem.bulletSize, 
            bulletSpeed*2, 
            cItem.bulletsPerShot, 
            cItem.acceleration
        );
    }
    posBullet(x,y,angle,bulletSpeed,i,fx,cItem) {
        // Step 1: Calculate the backward position
        const backwardX = x - fx * Math.cos(angle + Math.PI);
        const backwardY = y - fx * Math.sin(angle + Math.PI);

        // Step 2: Add side offset (perpendicular to angle)
        const spreadFactor = (i % 2 == 0 ? 1 : -1); // Alternate sides
        const offsetX = 10* (Math.round(i/2)*2 + Math.round(Math.abs(fx)/25)) * spreadFactor * Math.cos(angle + Math.PI / 2);
        const offsetY = 10* (Math.round(i/2)*2 + Math.round(Math.abs(fx)/25)) * spreadFactor * Math.sin(angle + Math.PI / 2);

        const finalX = backwardX + offsetX;
        const finalY = backwardY + offsetY;
        let a = Math.atan2(mousey+camera.y - finalY, mousex+camera.x - finalX);
        projManager.createProjectile(
            finalX, 
            finalY,
            a, 
            cItem.color,
            cItem.spread, 
            cItem.lifespan, 
            cItem.bulletSize, 
            bulletSpeed*2, 
            cItem.bulletsPerShot, 
            cItem.acceleration
        );


    }

    colorChangeBullet(x,y,angle,bulletSpeed,c,cItem) {
        projManager.createProjectile(
            x, 
            y, 
            angle, 
            ((c==0) ?"black":cItem.color),
            cItem.spread, 
            cItem.lifespan, 
            cItem.bulletSize, 
            bulletSpeed, 
            cItem.bulletsPerShot, 
            cItem.acceleration
        );
    }
}