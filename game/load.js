//for the canvas
let canvas;
let body;
let ctx;

const fps = 60;
let lastFrameTime = 0;

let textSize = 20;

let mousex = 0;
let mousey = 0;

let clicking = false;

let playing = true;
let pKey = [false, false, false, false];
let camPos = "player";





let screenSize = 10000;

document.addEventListener('DOMContentLoaded', function() { //load everything
    canvas = document.createElement('canvas');
    canvas.id = "CursorLayer";
    
    canvas.height = 500;
    canvas.width = 500;
    canvas.width = window.screen.width-50;
    canvas.height = window.screen.height-100;
    canvas.style.top = "0px";
    //canvas.style.left = ((window.screen.width / 2) - (canvas.width / 2)) + "px";
    canvas.style.left = "0px";
    canvas.style.position = "absolute";
    canvas.style.borderWidth = "0px";
    
    body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    ctx.font = textSize + "px Georgia";
    
    camera.width = ctx.canvas.width;
    camera.height = ctx.canvas.height;
    
    
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
    window.addEventListener('mousedown',mousedown);
    window.addEventListener('mouseup',mouseup);
    window.addEventListener('mousemove',mousemove);
    requestAnimationFrame(gameLoop);
    
    document.body.style.cursor = 'none';
});