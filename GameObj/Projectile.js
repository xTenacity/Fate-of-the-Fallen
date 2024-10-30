class Projectile {
    constructor(x,y,dir,dmg, time, speed, type, size, shots, spread) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.dmg = dmg;
        this.time = time;
        this.speed = speed;
        this.type = type;
        this.size = size;
        this.shots = shots;
        this.spread = spread;
    }
    move() {
        this.x += this.speed*Math.cos(this.dir);
        this.y += this.speed*Math.sin(this.dir);
        if (this.type == "accelerate" || this.type == "railgun") {
            this.speed *= 1.25;
        }
        this.time--;
    }
}