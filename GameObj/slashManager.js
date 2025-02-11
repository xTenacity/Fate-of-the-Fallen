class SlashManager {
    constructor() {
        this.slashes = [];
    }
    createSlash(x,y,dir,side,color,speed,size) {
        this.slashes.push(new Slash(
            x,
            y,
            dir,
            side,
            color,
            speed,
            size));
    }
    updateSlashes() {
        let toBeRemoved = [];
        for (let i = 0; i < this.slashes.length; i++) {
            this.slashes[i].move();
            if (!this.slashes[i].slashing) {
                toBeRemoved.push(i);
            }
        }
        for (let i = toBeRemoved.length - 1; i >= 0; i--) {
            this.slashes.splice(toBeRemoved[i], 1);
        }
    }
}