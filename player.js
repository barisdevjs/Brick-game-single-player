export default class Player {
    constructor(game) { // gameWidth, gameHeight
        this.width = 150; // just hard-coded for now
        this.height = 30;
        this.widthGame = game.widthGame;
        this.heightGame = game.heightGame;
        this.maxSpeed = 7;
        this.speed = 0; // current speed of the player

        this.position = {
            x: game.widthGame / 2 - this.width / 2,
            y: game.heightGame - this.height - 10
        }
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }

    draw(ctx) {    // it is a method
        ctx.fillStyle = '#142d4c';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        this.position.x += this.speed; 

        if (this.position.x < 0) { // if player is at the left edge of the screen
            this.position.x = 0;
        }

        if (this.position.x + this.width > this.widthGame) { // if player is at the right edge of the screen screen
            this.position.x = this.widthGame - this.width;
        }
    }

}


