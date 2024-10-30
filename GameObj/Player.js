class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.HP = 100;
        this.maxHP = 100;
        this.size = 30;
        this.speed = 10;
        this.xvelo = 0;
        this.yvelo = 0;
        this.color = "black";
        this.isDashing = false;
        this.dashCooldown = 0; 
        this.dashDelay = 20; // Improved as you get better wings.
        this.dashStrength = 30; //Also improved.
        this.tpCooldown = 1;
        this.tpDelay = 0;
        this.shootType = 0;
        this.shootTypeList = ["default", "accelerate", "shotgun", "minigun", "railgun"];
        this.shots = 5;
        this.accuracy = 15;
        this.bullets = 1000000000000;
        this.shootDelay = 0;
    }
    dash() {
        if (this.dashCooldown == this.dashDelay && this.isDashing == false && (this.xvelo != 0 || this.yvelo != 0)) {
            this.isDashing = true;
            if (Math.abs(this.xvelo) > Math.abs(this.yvelo)) {
                this.xvelo = this.xvelo > 0 ? this.dashStrength : -this.dashStrength;
            } else if (Math.abs(this.xvelo) < Math.abs(this.yvelo)) {
                this.yvelo = this.yvelo > 0 ? this.dashStrength : -this.dashStrength;
            } else {
                let normalize = this.dashStrength * (1 / Math.sqrt(2));
                this.xvelo = this.xvelo > 0 ? normalize : -normalize;
                this.yvelo = this.yvelo > 0 ? normalize : -normalize;
            }
        } else {
            console.log("Cannot dash");
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
            let normalize = this.speed * (1 / Math.sqrt(2));
            if (pKey[0]) { //up
                this.yvelo = -this.speed;
                if (pKey[1]) { //up left
                    this.yvelo = -normalize;
                    this.xvelo = -normalize;
                }
                if (pKey[3]) { //up right
                    this.yvelo = -normalize;
                    this.xvelo = normalize;
                }
                if (pKey[2]) { //up down
                    this.yvelo = 0;
                }
            }
            if (pKey[1]) { //left
                this.xvelo = -this.speed;
                if (pKey[0]) { //left up
                    this.yvelo = -normalize;
                    this.xvelo = -normalize;
                }
                if (pKey[2]) { //left down
                    this.yvelo = normalize;
                    this.xvelo = -normalize;
                }
                if (pKey[3]) { //left right
                    this.xvelo = 0;
                }
            }
            if (pKey[2]) { //down
                this.yvelo = this.speed;
                if (pKey[1]) { //down left
                    this.yvelo = normalize;
                    this.xvelo = -normalize;
                }
                if (pKey[3]) { //down right
                    this.yvelo = normalize;
                    this.xvelo = normalize;
                }
                if (pKey[0]) { //down up
                    this.yvelo = 0;
                }
            }
            if (pKey[3]) { //right
                this.xvelo = this.speed;
                if (pKey[0]) { //right up
                    this.yvelo = -normalize;
                    this.xvelo = normalize;
                }
                if (pKey[2]) { //right down
                    this.yvelo = normalize;
                    this.xvelo = normalize;
                }
                if (pKey[1]) { //right left
                    this.xvelo = 0;
                }
            }
        }
        this.xvelo *= 0.8;
        this.yvelo *= 0.8;
        if (Math.abs(this.xvelo) < 0.5) {
            this.xvelo = 0;
            this.x = Math.round(this.x);
        }
        if (Math.abs(this.yvelo) < 0.5) {
            this.yvelo = 0;
            this.y = Math.round(this.y);
        }
        if (this.isDashing && Math.abs(this.yvelo) <= 2 && Math.abs(this.xvelo) <= 2) {
            this.isDashing = false;
            this.dashCooldown = 0;
        }
        this.x += this.xvelo;
        this.y += this.yvelo;
    }
    tp() {
        if (this.tpCooldown == this.tpDelay) {
            this.tpCooldown = 0;
            this.x = mousex;
            this.y = mousey;
        }
    }
    shoot() {
        if (clicking) {
            if (player.shootDelay == 0 && player.bullets>0) {
                player.bullets--;
                let spread = this.accuracy;
                if (pKey[0] || pKey[1] || pKey[2] || pKey[3]) {
                    spread/=2.5;
                }
                let angle = Math.atan2(mousey - player.y,mousex - player.x);
                projManager.createProjectile(player.x, player.y, angle, 0, 30, 20, this.shootTypeList[this.shootType],10, this.shots, spread);
            }
        }
    }
}