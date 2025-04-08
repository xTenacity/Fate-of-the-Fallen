class Room {
    constructor(roomID, roomWidth, roomHeight, tileSize, layers) { //width, height, list of lists of tiles
        this.roomID = roomID;
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        this.tileSize = tileSize;
        this.layers = layers;
        this.onRoomLoaded();
    }

    onRoomLoaded() {
        console.log("Room " + this.roomID + " loaded successfully! (" + this.roomWidth + "x" + this.roomHeight + ", " + this.tileSize + "px)");
    }
    
} 