module.exports = class Ball {
  constructor(canvas, player) {
  this.canvas = canvas
  this.ctx = canvas.getContext('2d')
  this.player = player
  this.radius = 15;
  this.x = this.player.x + this.player.width /2;
  this.y = this.player.y - this.radius;
  this.speed_x = 0;
  this.speed_y = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath(); 
  }

  move() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.checkCollition();
    this.y += this.speed_y
    this.x += this.speed_x
    this.draw()
  }

  checkCollition(){
    // check colliton agaist the end of the canvas
    if (this.x + this.radius > this.canvas.width) {
      this.speed_x = -1 * this.speed_x  
    } else if (this.x - this.radius < 0) {
      this.speed_x = -1 * this.speed_x
    }

    if (this.y - this.radius < 0) {
      this.speed_y = -1 * this.speed_y
    }

    // check collition with leader rect
    if (this.y + this.radius > this.player.y && this.y + this.radius < this.player.y + this.player.height) {
      if (this.x + this.radius > this.player.x && this.x + this.radius < this.player.x + this.player.width) {
        if (this.speed_y > 0) {
          this.speed_y = -1 * this.speed_y
          this.speed_x = this.speed_x + ( 0.5 - Math.random()); 
        }
      } else if (this.x - this.radius > this.player.x && this.x - this.radius < this.player.x + this.player.width) {
        if (this.speed_y > 0) {
          this.speed_y = -1 * this.speed_y
          this.speed_x = this.speed_x + ( 0.5 - Math.random()); 
        }
      }
    }
  }

  outOfBounds() {
    if (this.y - this.radius == this.canvas.height) {
      return true
    } else {
      return false 
    }
  }
}