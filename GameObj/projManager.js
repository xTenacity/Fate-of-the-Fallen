class ProjectileManager {
    constructor() {
        this.projectiles = [];
    }
    calcRandomSpread(shots,spread) {
        let s = spread / (pKey[0] || pKey[1] || pKey[2] || pKey[3] ? 1.5 : 1);
        return (Math.random() / s - Math.random() / s) * shots;
    }
//projManager.createProjectile(x, y, angle, cItem.spread, cItem.recoil, cItem.lifespan, cItem.bulletSize, cItem.bulletsPerShot);
    createProjectile(x, y, dir, color, spread, lifespan, bulletSize, bulletSpeed, bulletsPerShot, acceleration) {
        this.projectiles.push(new Projectile(
            x, 
            y, 
            dir+this.calcRandomSpread(spread,bulletsPerShot), 
            color, 
            bulletSize, 
            bulletSpeed, 
            lifespan, 
            acceleration));
    }
    updateProjectiles() {
        if (itemManager.itemCooldown > 0) {
            itemManager.itemCooldown--;
        }
        let toBeRemoved = [];
        for (let i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].move();
            if (this.projectiles[i].lifespan <= 0) {
                toBeRemoved.push(i);
            }
        }
        for (let i = 0; i < toBeRemoved.length; i++) {
            this.projectiles.splice(toBeRemoved[i],1);
        }
    }
}