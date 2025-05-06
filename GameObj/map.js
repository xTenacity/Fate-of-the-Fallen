class Map {
    constructor(data,firstRoom) { //width, height, list of lists of rooms
        this.rooms = [];
        this.currentRoom = "";
        this.loadData(data,firstRoom);
    }
    async loadData(dt,firstRoom) {
        fetch("GameObj/media/maps/" + dt + '.json')  // Fetch the JSON file
        .then(response => response.json())  // Parse the JSON response
        .then(data => {
          const roomsData = data.rooms;  // Get the rooms array
          for (const roomData of roomsData) {
            const room = new Room(roomData.roomID, roomData.roomWidth, roomData.roomHeight, roomData.tileSize, roomData.layers, roomData.spawnPoints);
            this.rooms.push(room);
          };
          console.log("All rooms loaded!");
          this.loadRoom(firstRoom);
        })
        .catch(error => console.error('Error loading rooms:', error));
    }
    async loadRoom(roomID) {
        console.log("Loading " + roomID + "...");
        for (var i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].roomID == roomID) {
                console.log("Loading " + roomID + " was successful!"); 
                screenWidth = this.rooms[i].roomWidth * this.rooms[i].tileSize;
                screenHeight = this.rooms[i].roomHeight * this.rooms[i].tileSize;
                this.currentRoom = this.rooms[i];
                return this.rooms[i];
            }
        }
        console.log("Room " + roomID + " could not be loaded...");
        return false;
    }
}