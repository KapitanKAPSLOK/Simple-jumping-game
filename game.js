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
    constructor(fps, gameArea, timerArea) {
        // Gravitational constant.
        this.g = 1400;
        this.obstaclesSpeedPxPerSec = -300;
        // Minimal time between appearence of obstacles.
        this.obstacleMinTimeoutMs = 400;
        // Maximal time between appearence of obstacles.
        this.obstacleMaxTimeoutMs = 3000;
        this.gameOn = false;
        this.gameArea = gameArea;
        this.refreashRate = 1000 / fps;
        this.obstacles = new Set();
        this.timer = new Timer(timerArea);
        this.addPlayer();
    }
    addPlayer() {
        if (this.player === undefined) {
            this.player = new Player(this.g);
            this.gameArea.appendChild(this.player.div);
        }
    }
    removeIfOutsideGameArea(obst) {
        if (obst.x + obst.width < 0) {
            this.obstacles.delete(obst);
            this.gameArea.removeChild(obst.div);
        }
    }
    calculateFrame() {
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
    addObstacle(width, height, speedXPxPerSec, speedYPxPerSec) {
        const o = new Obstacle(width, height, speedXPxPerSec, speedYPxPerSec);
        this.gameArea.appendChild(o.div);
        this.obstacles.add(o);
    }
    /*
    If game is on generates sequentially new obstacles with random interval
    between them (from obstacleMinTimeoutMs to obstacleMaxTimeoutMs).
    */
    generateObstacles() {
        setTimeout(() => {
            if (this.gameOn) {
                this.addObstacle(20, 50, this.obstaclesSpeedPxPerSec, 0);
                this.generateObstacles();
            }
        }, Math.floor(Math.random() * (this.obstacleMaxTimeoutMs - this.obstacleMinTimeoutMs))
            + this.obstacleMinTimeoutMs);
    }
    startGame() {
        this.gameOn = true;
        this.generateObstacles();
        this.timer.start();
        this.intervalId = setInterval(() => {
            this.calculateFrame();
        }, this.refreashRate);
    }
    endGame() {
        this.gameOn = false;
        clearInterval(this.intervalId);
        this.timer.stop();
        this.player.freeze();
    }
}
const gameArea = document.getElementById('game');
const timerArea = document.getElementById('timer');
if (gameArea !== null && timerArea !== null) {
    const game = new Game(50, gameArea, timerArea);
    game.startGame();
}
