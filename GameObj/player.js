class Player {
    constructor(x, y) {
        //health
        this.health = 100;
        this.maxHP = 100;
        //movement and pos
        this.x = x;
        this.y = y;
        this.size = 30;
        this.speed = 8;
        this.xvelo = 0;
        this.yvelo = 0;

        this.color = "black";
        //dash 
        this.isDashing = false;
        this.dashCooldown = 0; 
        this.dashDelay = 50
        this.dashStrength = 1;
        //tp
        this.tpCooldown = 1;
        this.tpDelay = 0;
    }
    dash() {
        if (this.dashCooldown >= this.dashDelay / 2 && !this.isDashing && (this.xvelo || this.yvelo)) {
            let dashDistance = this.dashStrength * this.dashCooldown;
            this.isDashing = true;
            this.dashCooldown = 0;
            if (Math.abs(this.xvelo) > Math.abs(this.yvelo)) {
                this.xvelo = this.xvelo > 0 ? dashDistance : -dashDistance;
            } else if (Math.abs(this.yvelo) > Math.abs(this.xvelo)) {
                this.yvelo = this.yvelo > 0 ? dashDistance : -dashDistance;
            } else {
                let normalize = dashDistance * (1 / Math.sqrt(2));
                this.xvelo = this.xvelo > 0 ? normalize : -normalize;
                this.yvelo = this.yvelo > 0 ? normalize : -normalize;
            }
        }
    }

    move() {
        if (this.dashCooldown < this.dashDelay) {
            this.dashCooldown++;
        }
        if (this.tpCooldown < this.tpDelay) {
            this.tpCooldown++;
        }
        if (!this.isDashing) {
            const normalize = this.speed * (1 / Math.sqrt(2));
            if (pKey[0]) {
                this.yvelo = pKey[1] || pKey[3] ? -normalize : -this.speed;
            } else if (pKey[2]) {
                this.yvelo = pKey[1] || pKey[3] ? normalize : this.speed;
            }
            if (pKey[1]) {
                this.xvelo = pKey[0] || pKey[2] ? -normalize : -this.speed;
            }  else if (pKey[3]) {
                this.xvelo = pKey[0] || pKey[2] ? normalize : this.speed;
            }
            if (pKey[0] && pKey[2]) {
                player.yvelo = 0;
            } 
            if (pKey[1] && pKey[3]) {
                player.xvelo = 0;
            }
        }

        this.xvelo *= 0.8;
        this.yvelo *= 0.8;
        
        if (Math.abs(this.xvelo) < 0.5) {
            this.xvelo = 0;
        }
        if (Math.abs(this.yvelo) < 0.5) {
            this.yvelo = 0;
        }
        
        if (this.isDashing && Math.abs(this.xvelo) <= 2 && Math.abs(this.yvelo) <= 2) {
            this.isDashing = false;
        }

        this.x += this.xvelo;
        this.y += this.yvelo;

        this.x = Math.min(Math.max(this.x, this.size / 2), screenWidth - this.size / 2);
        this.y = Math.min(Math.max(this.y, this.size / 2), screenHeight - this.size / 2);









        if (clicking && itemManager.items.length > 0) {
            itemManager.useItem();
        }
        if (itemManager.itemCooldown > 0) {
            itemManager.itemCooldown--;
        }
    }

    tp() {
        if (this.tpCooldown >= this.tpDelay) {
            this.tpCooldown = 0;
            this.x = mousex+camera.x;
            this.y = mousey+camera.y;
        }
    }
}