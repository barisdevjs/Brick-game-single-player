import { collisionDetector } from "./collision.js";

export default class Brick {
  constructor(game,position) {
    this.image = document.getElementById('brickImage');
    this.scoreElement = document.getElementById('score');
    this.position = position
    this.width=50; // 16 * 50 = 800 levels.js for bricks
    this.height=24;
    this.game = game;
    this.markedForDeletion = false; 
  }
  
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
      );
    }
    
    update() {
      if ( collisionDetector(this.game.ball,this)) { // this ==> brick
        this.game.ball.speed.y = -this.game.ball.speed.y;
        this.markedForDeletion = true; // marking bricks for deletion
      } 
  }
}