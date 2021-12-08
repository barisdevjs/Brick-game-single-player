import { collisionDetector} from './collision.js';

export default class Ball {

    constructor(game) { // widthGame, heightGame
        this.image = document.getElementById('ballImage');
        this.size = 16; 
        this.widthGame = game.widthGame;
        this.heightGame = game.heightGame;
        this.game = game;
        this.reset();
        this.array = [...document.querySelectorAll('.lives > img')];
        console.log(this.array);
    }

    reset() {
        this.position = {x:110, y:310};
        this.speed = {x:3, y:5};
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.size
            ); // image, dx, dy, dWidth, dHeight
    }


    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // wall on the right or left

        if (this.position.x + this.size > this.widthGame || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        // wall on the top or bottom

        if ( this.position.y < 0) {   // top
            this.speed.y = -this.speed.y;
        }

        if (collisionDetector(this, this.game.player)) { // this ==> ball
            this.speed.y = -this.speed.y;
            this.position.y = this.game.player.position.y - this.size;
        }

        if (this.position.y + this.size > this.heightGame) { // touching the bottom
            this.game.lives--;
            this.array[this.game.lives].style.display = 'none';
            this.reset();
        }
    }

}