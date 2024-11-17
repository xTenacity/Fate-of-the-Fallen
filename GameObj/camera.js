class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width;
        this.height;
        this.zoom = 1;
        this.shakeFactor = 0;
    }
    shake(shakeFactor) {
        this.shakeFactor = shakeFactor;
    }
}