module.exports = class Title {
    // *******************************************
  // ***************** Tile
  // *******************************************
  constructor(canvas, ball, x, y) {
    this.ctx = canvas.getContext('2d');
    this.margin = 10;
    this.x = x + this.margin
    this.y = y + this.margin
    this.width = 110;
    this.height = 15;
    this.color = "pink"
    this.ball = ball
    this.dead = false
  }

  draw () {
    if (!this.dead) {
      this.ctx.beginPath()
      this.ctx.rect(this.x, this.y, this.width, this.height)
      this.ctx.fillStyle = this.color
      this.ctx.fill()
      this.ctx.closePath()
    }
  }

  checkCollition() {
    if (!this.dead) {
      if (this.ball.y - this.ball.radius > this.y && this.ball.y - this.ball.radius < this.y + this.height) {
        if (this.ball.x + this.ball.radius > this.x && this.ball.x + this.ball.radius < this.x + this.width) {
          this.dead = true;
          return true;
        } 
      }
    }
  }
}