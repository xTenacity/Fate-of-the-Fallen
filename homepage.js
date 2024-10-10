//for the canvas
var canvas;
var body;
var ctx;

var playing = true;
var pKey = [false, false, false, false];

class Player {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
}

class Map {
  constructor(width, height, rooms) { //width, height, list of lists of rooms
    this.width = width;
    this.height = height;
    this.rooms = rooms;
  }
}

class Room {
  constructor(width, height, tiles) { //width, height, list of lists of tiles
    this.width = width;
    this.height = height;
    this.tiles = tiles;
  }
}

const player = new Player(50, 50, 0);

/*
0 - empty
1 - red block
2 - blue block
3 - green block
4 - yellow block
5 - controlled block
*/
document.addEventListener('DOMContentLoaded', function() { //load everything
  canvas = document.createElement('canvas');
  canvas.id = "CursorLayer";

  //CHANGE LATER
  //canvas.width = window.screen.width - 50;
  //canvas.height = window.screen.height - 200;
  canvas.width = 300;
  canvas.height = 300;
  canvas.style.top = "20px";
  canvas.style.left = ((window.screen.width / 2) - (canvas.width / 2)) + "px";
  canvas.style.position = "absolute";
  canvas.style.borderWidth = "10px";

  body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  document.addEventListener('keydown', keydown);
  document.addEventListener('keyup', keyup);
  //drawUI();
  setInterval(updateScreen, 10);
});

function drawUI() { //draw the screen

}

function updateScreen() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(player.x - (player.size / 2), player.y - (player.size / 2), player.size, player.size);
  move();
  drawUI();
  //console.log(player.x + "," + player.y);
}

function move() {
  if (pKey[0] == true && pKey[2] == false) { //if going up and not down
    player.y -= 5;
  }
  if (pKey[0] == false && pKey[2] == true) { //if going down and not up
    player.y += 5;
  }
  if (pKey[1] == true && pKey[3] == false) { //if going left and not right
    player.x -= 5;
  }
  if (pKey[1] == false && pKey[3] == true) { //if going right and not left
    player.x += 5;
  }
}



function checkInput(key, event) {
  if (event == "down") {
    if (key == "w") { //up
      pKey[0] = true;
    }
    if (key == "a") { //left
      pKey[1] = true;
    }
    if (key == "s") { //down
      pKey[2] = true;
    }
    if (key == "d") { //right
      pKey[3] = true;
    }
  } else {
    if (key == "w") { //up
      pKey[0] = false;
    }
    if (key == "a") { //left
      pKey[1] = false;
    }
    if (key == "s") { //down
      pKey[2] = false;
    }
    if (key == "d") { //right
      pKey[3] = false;
    }
  }
}

function keydown(event) {
  checkInput(event.key, "down");
}

function keyup(event) {
  checkInput(event.key, "up");
}









































/*
var player;
var canvas;
var c;
var px;
var py;
var pw;
var ph;
var xvelo = 0;
var yvelo = 0;
var pSpeed = 5;
var pKey = [false, false, false, false];
console.log(window.innerWidth + "," + window.innerHeight);

document.addEventListener('DOMContentLoaded', function() {
  player = document.getElementById("player");
  canvas = document.querySelector("canvas");
  c = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
  c.fillStyle = 'gray';
  c.fillRect(0, 0, canvas.width, canvas.height);
  px = parseInt(player.style.left);
  py = parseInt(player.style.top);
  pw = parseInt(player.style.width);
  ph = parseInt(player.style.height);
  document.addEventListener('keydown', keydown);
  document.addEventListener('keyup', keyup);
  setInterval(loop, 10);
});
function loop() {
  document.getElementById("pos").innerHTML = px + "," + py;
  document.getElementById("velo").innerHTML = xvelo + "," + yvelo;
  checkInput();
  xvelo *= 0.8;
  yvelo *= 0.8;
  if (Math.abs(xvelo) < 0.01) {
    xvelo = 0;
    px = Math.round(px);
  }
  if (Math.abs(yvelo) < 0.01) {
    yvelo = 0;
    py = Math.round(py);
  }
  px += xvelo;
  py += yvelo;
  checkBounds();
  player.style.top = py + "px";
  player.style.left = px + "px";
}
function keydown(event) {
  if (event.key == "ArrowUp" || event.key == "w") {
    pKey[0] = true;
  }
  if (event.key == "ArrowLeft" || event.key == "a") {
    pKey[1] = true;
  }
  if (event.key == "ArrowDown" || event.key == "s") {
    pKey[2] = true;
  }
  if (event.key == "ArrowRight" || event.key == "d") {
    pKey[3] = true;
  }
  if (event.key == "e") {
    console.log("hi");
    player.style.width = (parseInt(player.style.width) + 1) + "px";
    player.style.height = (parseInt(player.style.height) + 1) + "px";
    pw = parseInt(player.style.width);
    ph = parseInt(player.style.height);
  }
}
function keyup(event) {
  if (event.key == "ArrowUp" || event.key == "w") {
    pKey[0] = false;
  }
  if (event.key == "ArrowLeft" || event.key == "a") {
    pKey[1] = false;
  }
  if (event.key == "ArrowDown" || event.key == "s") {
    pKey[2] = false;
  }
  if (event.key == "ArrowRight" || event.key == "d") {
    pKey[3] = false;
  }
}
function checkInput() {
  var normalize = pSpeed * (1 / Math.sqrt(2));
  if (pKey[0]) { //up
    yvelo = -pSpeed;
    if (pKey[1]) { //up left
      yvelo = -normalize;
      xvelo = -normalize;
    }
    if (pKey[3]) { //up right
      yvelo = -normalize;
      xvelo = normalize;
    }
    if (pKey[2]) { //up down
      yvelo = 0;
    }
  }
  if (pKey[1]) { //left
    xvelo = -pSpeed;
    if (pKey[0]) { //left up
      yvelo = -normalize;
      xvelo = -normalize;
    }
    if (pKey[2]) { //left down
      yvelo = normalize; // Fix this line to be positive for down
      xvelo = -normalize;
    }
    if (pKey[3]) { //left right
      xvelo = 0;
    }
  }
  if (pKey[2]) { //down
    yvelo = pSpeed;
    if (pKey[1]) { //down left
      yvelo = normalize;
      xvelo = -normalize;
    }
    if (pKey[3]) { //down right
      yvelo = normalize;
      xvelo = normalize;
    }
    if (pKey[0]) { //down up
      yvelo = 0;
    }
  }
  if (pKey[3]) { //right
    xvelo = pSpeed;
    if (pKey[0]) { //right up
      yvelo = -normalize;
      xvelo = normalize;
    }
    if (pKey[2]) { //right down
      yvelo = normalize;
      xvelo = normalize;
    }
    if (pKey[1]) { //right left
      xvelo = 0;
    }
  }
}
function checkBounds() {
  if (px < 0) {
    px = 0;
  }
  if (px > 500 - pw) {
    px = 500 - pw;
  }
  if (py < -503) {
    py = -503;
  }
  if (py > -4 - ph) {
    py = -4 - ph;
  }
}*/
