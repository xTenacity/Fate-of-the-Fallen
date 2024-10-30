class ProjectileManager {
    constructor() {
        this.projectiles = [];
    }
    createProjectile(x,y,dir,dmg,time,speed, type, size, shots, spread) {
        if (type == "shotgun") {
            player.shootDelay = 5+(5*shots);
            for (let i = 0; i < shots; i++) {
                let randSpread = Math.random()/spread - Math.random()/spread;
                this.projectiles.push(new Projectile(x,y,dir+randSpread*shots,dmg,time,speed, type, size/2));
            }
        } else if (type == "accelerate") {
            player.shootDelay = 10;
            let randSpread = Math.random()/spread - Math.random()/spread;
            this.projectiles.push(new Projectile(x,y,dir+randSpread,dmg,time, 1, type, size));
        } else if (type == "minigun") {
            player.shootDelay = 1;
            player.xvelo -= 5*Math.cos(dir);
            player.yvelo -= 5*Math.sin(dir);
            let randSpread = Math.random()/spread - Math.random()/spread;
            this.projectiles.push(new Projectile(x,y,dir+randSpread,dmg,time,speed,type,size/2));
        } else if (type == "railgun") {
            player.shootDelay = 20;
            player.xvelo -= 100*Math.cos(dir);
            player.yvelo -= 100*Math.sin(dir);
            let randSpread = Math.random()/spread - Math.random()/spread;
            for (let i = 0; i < 10; i++) {
                this.projectiles.push(new Projectile(x,y,dir+randSpread,dmg,time,speed+i,type,size));
            }
        } else {
            player.shootDelay = 5;
            this.projectiles.push(new Projectile(x,y,dir+Math.random()/spread - Math.random()/spread,dmg,time,speed, type, size));
        }
    }
    updateProjectiles() {
        if (player.shootDelay > 0) {
            player.shootDelay--;
        }
        let toBeRemoved = [];
        for (let i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].move();
            ctx.fillRect(this.projectiles[i].x, this.projectiles[i].y,this.projectiles[i].size, this.projectiles[i].size);
            if (this.projectiles[i].time == 0) {
                toBeRemoved.push(i);
            }
        }
        for (let i = 0; i < toBeRemoved.length; i++) {
            this.projectiles.splice(toBeRemoved[i],1);
        }
    }
}