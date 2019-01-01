
// *******************************************
// ***************** LeaderRect
// *******************************************

function LeaderRect(canvas) {
  this.ctx = canvas.getContext('2d')
  this.canvas = canvas
  this.width = 110
  this.height = 15
  this.movingSpeed = 30
  this.color = "blue"
  this.x = (canvas.width - this.width) / 2;
  this.y = canvas.height * 0.95 - this.height;
}

LeaderRect.prototype.draw = function() {
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
// ***************** BALL 
// *******************************************
function Ball(canvas, leaderRect) {
  this.canvas = canvas
  this.ctx = canvas.getContext('2d')
  this.x = 20;
  this.y = 100;
  this.radius = 15;
  this.speed_x = -3;
  this.speed_y = -3;
  this.leaderRect = leaderRect
}

Ball.prototype.draw = function () {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  this.ctx.fillStyle = "red";
  this.ctx.fill();
  this.ctx.closePath(); 

}

Ball.prototype.move = function () {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height)
  this.checkCollition();
  this.y += this.speed_y
  this.x += this.speed_x
  this.draw()
}

Ball.prototype.checkCollition = function () {
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
  if (this.y + this.radius > this.leaderRect.y && this.y + this.radius < this.leaderRect.y + this.leaderRect.height) {
    if (this.x + this.radius > this.leaderRect.x) {
      if  (this.x + this.radius < this.leaderRect.x + this.leaderRect.width) {
        this.speed_y = -1 * this.speed_y
      }
    } 
  }
}

// *******************************************
// ***************** Tile
// *******************************************
function Tile(canvas, x, y) {
  this.ctx = canvas.getContext('2d');
  this.x = x
  this.y = y
  this.width = 110;
  this.height = 15;
  this.margin = 10;
  this.color = "pink"
}

Tile.prototype.draw = function () {
  this.ctx.beginPath()
  this.ctx.rect((this.x + this.margin), (this.y + this.margin), this.width, this.height)
  this.ctx.fillStyle = this.color
  this.ctx.fill()
  this.ctx.closePath()
}

const canvas = document.getElementById("game");
leaderRect = new LeaderRect(canvas)
ball = new Ball(canvas, leaderRect)

function buildTiles() {
  tiles = []
  quantity = Math.floor(canvas.width / 140);
  for (let i = 0; i <= quantity; i++) {
    tile = new Tile(canvas, 132 * i, 0)
    tiles.push(tile)
  }
  return tiles
}

document.addEventListener('keydown', (event) => {
  if (event.keyCode == 39) {
    leaderRect.moveRight()
  }
  if (event.keyCode == 37) {
    leaderRect.moveLeft()
  }
});

tiles = buildTiles()

function gameLoop() {
  ball.move()
  tiles.forEach(tile => {
    tile.draw()
  });
  leaderRect.draw();
}

setInterval(gameLoop, 10);
