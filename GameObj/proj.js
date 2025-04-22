class Projectile {
    constructor(x, y, dir, color, size, speed, lifespan, speedMult, despawnOnCollision) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.color = color;
        this.dmg = 0;
        this.lifespan = lifespan;
        this.speed = speed;
        this.speedMult = speedMult;
        this.ammo = "default";
        this.size = size;
        this.despawnOnCollision = despawnOnCollision
    }
    move() {
        this.x += this.speed*Math.cos(this.dir);
        this.y += this.speed*Math.sin(this.dir);
        this.speed *= this.speedMult;
        this.lifespan--;
    }
}