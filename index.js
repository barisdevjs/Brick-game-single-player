import Game from './game.js'

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d'); // context

const widthGame = 800;
const heightGame = 600;
 
let game = new Game(widthGame, heightGame);

/* ctx.clearRect(0, 0, width, height);
ctx.fillStyle = '#f00'; // first choose the color and then fill the shape everytime
ctx.fillRect(20, 20, 100, 100); // x, y, width, height */

let lastTime = 0;
 
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime; // difference between current time and last time
    lastTime = timestamp;
    ctx.clearRect(0, 0, widthGame, heightGame);
    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);  // requestAnimationFrame() is a browser API that calls a function or executes a code snippet at a specified time in the future.
}

requestAnimationFrame(gameLoop);
