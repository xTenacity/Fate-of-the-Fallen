//for the canvas
let canvas;
let body;
let ctx;

const fps = 60;
let lastFrameTime = 0;

let textSize = 30;

let mousex = 0;
let mousey = 0;
let cursoranim = 0;
let cursorinout = false;

let clicking = false;

let playing = true;
let pKey = [false, false, false, false];

document.addEventListener('DOMContentLoaded', function() { //load everything
    canvas = document.createElement('canvas');
    canvas.id = "CursorLayer";
    
    canvas.width = window.screen.width;
    canvas.height = window.screen.height;
    console.log(canvas.width);
    console.log(canvas.height);
    canvas.style.top = "0px";
    canvas.style.left = ((window.screen.width / 2) - (canvas.width / 2)) + "px";
    canvas.style.position = "absolute";
    canvas.style.borderWidth = "0px";
    
    body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    ctx.font = textSize + "px Georgia";

    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
    window.addEventListener('mousedown',mousedown);
    window.addEventListener('mouseup',mouseup);
    window.addEventListener('mousemove',mousemove);
    requestAnimationFrame(gameLoop);
    
    document.body.style.cursor = 'none';
});