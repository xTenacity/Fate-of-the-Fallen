class Slash {
    constructor(x,y,dir,side,color,speed,size) {
        this.x = x;
        this.y = y;
        this.dir = (dir + Math.PI) % (2 * Math.PI) - Math.PI;
        this.side = side;
        this.color = color;
        this.dmg = 0;
        this.speed = speed;
        this.slashing = true;
        this.currentAngle = dir + ((side == "left") ? (-Math.PI/3 - Math.PI/4) : (Math.PI/3 + Math.PI/4));
        this.size = size;
    }
    move() {
        // Increment or decrement the angle based on side
        if (this.side === "left") {
            this.currentAngle += this.speed;
            if (this.currentAngle >= this.dir + Math.PI / 2) {
                this.slashing = false; // End slash
            }
        } else if (this.side === "right") {
            this.currentAngle -= this.speed;
            if (this.currentAngle <= this.dir - Math.PI / 2) {
                this.slashing = false; // End slash
            }
        }
    }
}