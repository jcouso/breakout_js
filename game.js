
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
const canvas = document.getElementById("game");

leaderRect = new LeaderRect(canvas)

document.addEventListener('keydown', (event) => {
  if (event.keyCode == 39) {
    leaderRect.moveRight()
  }
  if (event.keyCode == 37) {
    leaderRect.moveLeft()
  }
});

// BALL



function Ball(canvas, leaderRect) {
  this.ctx = canvas.getContext('2d')

  this.x = 20;
  this.y = 100;
  
  this.speed_x = -1;
  this.speed_y = -1;
}

Ball.prototype.drawBall = function () {
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

Ball.prototype.ballMove = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  if (x + 15 > canvas.width) {
    speed_x = -1 * speed_x  
  } else if (x < 15) {
    speed_x = -1 * speed_x
  }
  if (y + 15 == leaderRect.y && ((x + 15) > leaderRect.x && (x + 15) < (leaderRect.x + leaderRect.width))) {
    speed_y = -1 * speed_y
  } else if (y + 15 > canvas.height) {  
  } else if (y < 15) {
    speed_y = -1 * speed_y
  }

  y += speed_y
  x += speed_x
  this.drawBall() 
}

function gameLoop() {
  ballMovement()
  leaderRect.drawRectagle();
}

setInterval(gameLoop, 1);
