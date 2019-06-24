(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Player = require('./player')

// *******************************************
// ***************** BALL 
// *******************************************
function Ball(canvas, leaderRect) {
  this.canvas = canvas
  this.ctx = canvas.getContext('2d')
  this.leaderRect = leaderRect
  this.radius = 15;
  this.x = this.leaderRect.x + this.leaderRect.width /2;
  this.y = this.leaderRect.y - this.radius;
  this.speed_x = 0;
  this.speed_y = 0;
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
    if (this.x + this.radius > this.leaderRect.x && this.x + this.radius < this.leaderRect.x + this.leaderRect.width) {
      if (this.speed_y > 0) {
        this.speed_y = -1 * this.speed_y
        this.speed_x = this.speed_x + ( 0.5 - Math.random()); 
      }
    } else if (this.x - this.radius > this.leaderRect.x && this.x - this.radius < this.leaderRect.x + this.leaderRect.width) {
      if (this.speed_y > 0) {
        this.speed_y = -1 * this.speed_y
        this.speed_x = this.speed_x + ( 0.5 - Math.random()); 
      }
    }
  }
}

Ball.prototype.outOfBounds = function() {
  if (this.y - this.radius == this.canvas.height) {
    return true
  } else {
    return false 
  }
}

// *******************************************
// ***************** Tile
// *******************************************
function Tile(canvas, ball, x, y) {
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

Tile.prototype.draw = function () {
  if (!this.dead) {
    this.ctx.beginPath()
    this.ctx.rect(this.x, this.y, this.width, this.height)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.ctx.closePath()
  }
}

Tile.prototype.checkCollition = function () {
  if (!this.dead) {
    if (this.ball.y - this.ball.radius > this.y && this.ball.y - this.ball.radius < this.y + this.height) {
      if (this.ball.x + this.ball.radius > this.x && this.ball.x + this.ball.radius < this.x + this.width) {
        this.dead = true;
        return true;
      } 
    }
  }
}

// ******************************************
const canvas = document.getElementById("game");

function gameInit() {
  leaderRect = new Player(canvas)
  ball = new Ball(canvas, leaderRect)
  tiles = buildTiles()
}

function buildTiles() {
  tiles = []
  quantity = Math.floor(canvas.width / 140);
  for (let i = 0; i <= quantity; i++) {
    let x = 132 * i
    let y = 0
    tile = new Tile(canvas, ball, x, y)
    tiles.push(tile)
  }
  return tiles
}
document.addEventListener('keydown', (event) => {
  if (event.keyCode == 39 && isGameOver == false) {
    leaderRect.moveRight()
  }
  if (event.keyCode == 37 && isGameOver == false) {
    leaderRect.moveLeft()
  }
  if (event.keyCode == 13 && isGameOver == true) {
    isGameOver = false
    gameInit()
  }

  if (event.keyCode == 32 && isGameOver == false && ball.speed_y == 0) {
    ball.speed_x = 2 + Math.ceil((0.5 - Math.random()));
    ball.speed_y = 4;
  }
});

function gameOver () {
  var ctx = canvas.getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", canvas.width/2 - 80, canvas.height/2);
  ctx.fillText("Press Enter", canvas.width/2 - 150, canvas.height/2 + 30);

  if (isGameOver == false) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    clearInterval(gameOverLoop)
  }
}

function gameLoop() {
  if (isGameOver == false) {
    ball.move()
    tiles.forEach(tile => {
      tile.draw()
      if (tile.checkCollition()) {
        ball.speed_y = ball.speed_y * -1
      }
    });
    leaderRect.draw();
  }

  if (ball.outOfBounds() && isGameOver == false) {
    isGameOver = true;
    canvas.getContext('2d').clearRect(0, 0, canvas.width -20, canvas.height)
    gameOverLoop = setInterval(gameOver(), 10);
  }
}

var gameOverLoop;
var isGameOver = false;
gameInit();
var gameLoopInt = setInterval(gameLoop, 10);


},{"./player":2}],2:[function(require,module,exports){

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

},{}]},{},[1]);
