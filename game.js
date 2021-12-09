import Player from './player.js'; 
import Ball from "./ball.js";
import InputHandler from "./input.js";
import {buildLevel, level1, level2} from "./levels.js";

const gameState = {
    paused : 0,
    running : 1,
    menu : 2,
    gameOver : 3,
    newLevel : 4
}

export default class Game {
    constructor(widthGame, heightGame) {
        this.widthGame = widthGame;
        this.heightGame = heightGame;
        this.gameState = gameState.menu;
        this.ball = new Ball(this) // widthGame, heightGame
        this.player = new Player(this) // player
/*         this.ball1 = new Ball(this) // this is for the second ball
        this.ball1.position = {x: this.widthGame/2, y: this.heightGame/2} */
        new InputHandler(this.player, this); 
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 2;
        this.gameOver = document.getElementById('gameOverImage');
        this.levels = [level1, level2];
        this.currentLevel = 0;
        this.scoreElement = document.getElementById('score');
        this.score = this.levels[this.currentLevel].length;
        this.levelELement = document.getElementById('level');
    }
    
    start() {
        if ( this.gameState != gameState.menu && this.gameState != gameState.newLevel) return; 
        // prevent starting game twice
        if ( this.gameState !== gameState.newLevel) {
            this.levelELement.innerHTML = this.currentLevel + 1;
        } else {
            this.levelELement.innerHTML =2;
        }
        this.bricks = buildLevel(this,this.levels[this.currentLevel]) // level this refers to the game
        this.ball.reset(); // for the new level
        this.gameObjects =[this.ball, this.player /*this.ball1*/] // second ball
        this.gameState = gameState.running;
    }


    update(deltaTime) {
        if ( this.lives === 0 ) this.gameState = gameState.gameOver
        if (this.gameState === gameState.paused ||
         this.gameState === gameState.menu ||
         this.gameState === gameState.gameOver
         ) 
         return; 

        if ( this.bricks.length === 0) { // try this => !
            this.currentLevel++;
            this.gameState = gameState.newLevel;
            this.start(); // start method need to know which level to start
        }

        [...this.gameObjects, ...this.bricks].
        forEach(object => object.update(deltaTime));

        this.bricks = this.bricks.
        filter( brick => !brick.markedForDeletion);

        this.scoreElement.innerHTML = this.bricks.length;
    }


    draw(ctx) {
        [...this.gameObjects, ...this.bricks].
        forEach(object => object.draw(ctx));
        if ( this.gameState === gameState.running ) { // pausing game
            ctx.rect(30,350,this.widthGame, this.heightGame);
            ctx.fillStyle = "rgba(155,0,220,0.1)";
            ctx.fill();
            ctx.font = "30px Sans-Serif";
            ctx.fillStyle = "Black";
            ctx.textAlign = "center";
            ctx.fillText("Press Esc to Pause", 400, 30);
        }

        if ( this.gameState === gameState.paused ) { // pausing game
            ctx.rect(0,0,this.widthGame, this.heightGame);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            ctx.font = "60px Sans-Serif";
            ctx.fillStyle = "darkblue";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.widthGame/2, this.heightGame/2);
        }

        if ( this.gameState === gameState.menu ) { // starting the game
            ctx.rect(0,0,this.widthGame, this.heightGame);
            ctx.fillStyle = "rgba(0,0,0,0.9)";
            ctx.fill();
            ctx.font = "60px Sans-Serif";
            ctx.fillStyle = "White";
            ctx.textAlign = "center";
            ctx.fillText("Press SpaceBar  To Start", this.widthGame/2, this.heightGame/2);
        }

        if ( this.gameState === gameState.gameOver ) { // starting the game
            ctx.drawImage(this.gameOver, 0, 0, this.widthGame, this.heightGame);  
        }
    }


    togglePause() {
        if ( this.gameState == gameState.paused ) {
            this.gameState = gameState.running;
        } else {
            this.gameState = gameState.paused;
        }
    }


}   