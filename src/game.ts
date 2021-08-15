import Timer from './timer.js';
import Player from './player.js';
import Obstacle from './obstacle.js';

/*
  Class with main logic of the game.
  Action happens within gameArea given in constructor.
  After calling method start() class starts calculating consecutive frames
  and checking if collision happend between player and obstacles to end the game.
*/
class Game {
  gameOn:boolean;

  // Gravitational constant.
  g:number = 1400;

  obstaclesSpeedPxPerSec = -300;

  // Minimal time between appearence of obstacles.
  obstacleMinTimeoutMs:number = 400;

  // Maximal time between appearence of obstacles.
  obstacleMaxTimeoutMs:number = 3000;

  timer:Timer;

  player!:Player;

  obstacles:Set<Obstacle>;

  gameArea:HTMLElement;

  // How many ms between each frame.
  refreashRate:number;

  intervalId!: ReturnType<typeof setInterval>;

  constructor(fps:number, gameArea:HTMLElement, timerArea:HTMLElement) {
    this.gameOn = false;
    this.gameArea = gameArea;
    this.refreashRate = 1000 / fps;
    this.obstacles = new Set();
    this.timer = new Timer(timerArea);

    this.addPlayer();
  }

  protected addPlayer() {
    if (this.player === undefined) {
      this.player = new Player(this.g);
      this.gameArea.appendChild(this.player.div);
    }
  }

  protected removeIfOutsideGameArea(obst:Obstacle) {
    if (obst.x + obst.width < 0) {
      this.obstacles.delete(obst);
      this.gameArea.removeChild(obst.div);
    }
  }

  protected calculateFrame() {
    this.player.updateState(this.refreashRate / 1000);
    this.player.draw();
    this.obstacles.forEach((obst) => {
      obst.updateState(this.refreashRate / 1000);
      obst.draw();
      if (this.player.isColliding(obst)) {
        this.endGame();
      }
      this.removeIfOutsideGameArea(obst);
    });
  }

  addObstacle(width:number, height:number, speedXPxPerSec: number, speedYPxPerSec: number):void {
    const o:Obstacle = new Obstacle(width, height, speedXPxPerSec, speedYPxPerSec);
    this.gameArea.appendChild(o.div);
    this.obstacles.add(o);
  }

  /*
  If game is on generates sequentially new obstacles with random interval
  between them (from obstacleMinTimeoutMs to obstacleMaxTimeoutMs).
  */
  generateObstacles():void {
    setTimeout(() => {
      if (this.gameOn) {
        this.addObstacle(20, 50, this.obstaclesSpeedPxPerSec, 0);
        this.generateObstacles();
      }
    }, Math.floor(Math.random() * (this.obstacleMaxTimeoutMs - this.obstacleMinTimeoutMs))
      + this.obstacleMinTimeoutMs);
  }

  startGame():void {
    this.gameOn = true;
    this.generateObstacles();
    this.timer.start();
    this.intervalId = setInterval(() => {
      this.calculateFrame();
    }, this.refreashRate);
  }

  endGame():void {
    this.gameOn = false;
    clearInterval(this.intervalId);
    this.timer.stop();
    this.player.freeze();
  }
}

const gameArea:HTMLElement | null = document.getElementById('game');
const timerArea:HTMLElement | null = document.getElementById('timer');

if (gameArea !== null && timerArea !== null) {
  const game = new Game(50, gameArea, timerArea);
  game.startGame();
}
