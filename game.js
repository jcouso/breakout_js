
// // *******************************************
function LeaderRect(canvas) {
  this.ctx = canvas.getContext('2d')
  this.canvas = canvas
  this.width = 110
  this.height = 15
  this.movingSpeed = 13
  this.color = "blue"
  this.x = (canvas.width - this.width) / 2;
  this.y = canvas.height * 0.95 - this.height;
}

LeaderRect.prototype.drawRectagle = function() {
  this.ctx.beginPath();
  this.ctx.rect(this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath(); 
}

LeaderRect.prototype.moveRight = function() {
  if ((this.x + this.width) < this.canvas.width) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.x += this.movingSpeed 
    this.drawRectagle(this.x, this.y)
  }
}

LeaderRect.prototype.moveLeft = function() {
  if (this.x > 0) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.x -= this.movingSpeed
    this.drawRectagle(this.x, this.y)
  }
}

// *******************************************

// BALL



function Ball(canvas, leaderRect) {
  this.canvas = canvas
  this.ctx = canvas.getContext('2d')
  this.x = 20;
  this.y = 100;
  this.speed_x = -1;
  this.speed_y = -1;
  this.leaderRect = leaderRect
}

Ball.prototype.drawBall = function () {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
  this.ctx.fillStyle = "red";
  this.ctx.fill();
  this.ctx.closePath();
}

Ball.prototype.ballMove = function () {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  if (this.x + 15 > this.canvas.width) {
    this.speed_x = -1 * this.speed_x  
  } else if (this.x < 15) {
    this.speed_x = -1 * this.speed_x
  }
  if (this.y + 15 == this.leaderRect.y && ((this.x + 15) > this.leaderRect.x && (this.x + 15) < (this.leaderRect.x + this.leaderRect.width))) {
    this.speed_y = -1 * this.speed_y
  } else if (this.y + 15 > this.canvas.height) {  
  } else if (this.y < 15) {
    this.speed_y = -1 * this.speed_y
  }

  this.y += this.speed_y
  this.x += this.speed_x
  this.drawBall() 
}


const canvas = document.getElementById("game");

leaderRect = new LeaderRect(canvas)

ball = new Ball(canvas, leaderRect)

document.addEventListener('keydown', (event) => {
  if (event.keyCode == 39) {
    leaderRect.moveRight()
  }
  if (event.keyCode == 37) {
    leaderRect.moveLeft()
  }
});

function gameLoop() {
  ball.ballMove()
  leaderRect.drawRectagle();
}

setInterval(gameLoop, 1);
