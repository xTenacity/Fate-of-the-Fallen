//for the canvas
let canvas;
let body;
let ctx;

const fps = 120;
let lastFrameTime = 0;

let textSize = 20;

let mousex = 0;
let mousey = 0;

let clicking = false;

let playing = true;
let pKey = [false, false, false, false];
let camPos = "player";

let screenHeight = 1000;
let screenWidth = 1000;

document.addEventListener('DOMContentLoaded', function() { //load everything
    canvas = document.createElement('canvas');
    canvas.id = "CursorLayer";
    
    canvas.width = window.screen.width-10;
    canvas.height = window.screen.height-125;
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.position = "absolute";
    canvas.style.borderWidth = "0px";
    
    body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    ctx.font = textSize + "px Georgia";
    
    camera.width = ctx.canvas.width;
    camera.height = ctx.canvas.height;
    camera.x = -camera.width/2;
    camera.y = -camera.height/2;

    
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
    window.addEventListener('mousedown',mousedown);
    window.addEventListener('mouseup',mouseup);
    window.addEventListener('mousemove',mousemove);
    requestAnimationFrame(gameLoop);
    
    document.body.style.cursor = 'none';
});