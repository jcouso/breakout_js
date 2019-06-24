const Player = require('./player')
const Ball = require('./ball')
const Tile = require('./tile')


// ******************************************
const canvas = document.getElementById("game");

function gameInit() {
  player = new Player(canvas)
  ball = new Ball(canvas, player)
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
    player.moveRight()
  }
  if (event.keyCode == 37 && isGameOver == false) {
    player.moveLeft()
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
    player.draw();
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

