import MovingDiv from './moving_div.js';
export default class Obstacle extends MovingDiv {
    constructor(width, height, speedXPxPerSec, speedYPxPerSec) {
        super(window.innerWidth - width, 0, width, height, speedXPxPerSec, speedYPxPerSec);
        this.div.style.backgroundColor = 'black';
        this.speedXPxPerSec = speedXPxPerSec;
        this.speedYPxPerSec = speedYPxPerSec;
    }
}
