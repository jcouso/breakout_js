
//
// Player call
// 

module.exports = class Player {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d')
    this.canvas = canvas
    this.width = 110
    this.height = 15
    this.movingSpeed = 30
    this.color = "blue"
    this.x = (canvas.width - this.width) / 2;
    this.y = canvas.height * 0.95 - this.height;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath(); 
  }

  // player move right
  moveRight() {
    if ((this.x + this.width) < this.canvas.width) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.x += this.movingSpeed 
      this.draw(this.x, this.y)
    }
  } 
 
  // player move left

  moveLeft() {
    if (this.x > 0) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.x -= this.movingSpeed
      this.draw(this.x, this.y)
    }
  }
}
