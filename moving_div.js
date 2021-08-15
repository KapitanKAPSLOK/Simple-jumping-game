/*
  Base class for implementing moving objects on the screen.
*/
export default class MovingDiv {
    constructor(startingX, startingY, width, height, speedXPxPerS, speedYPxPerS) {
        this.x = startingX;
        this.y = startingY;
        this.width = width;
        this.height = height;
        this.speedXPxPerSec = speedXPxPerS;
        this.speedYPxPerSec = speedYPxPerS;
        this.div = document.createElement('div');
        this.div.style.width = `${width}px`;
        this.div.style.height = `${height}px`;
        this.div.style.position = 'absolute';
        this.draw();
    }
    draw() {
        this.div.style.left = `${this.x}px`;
        this.div.style.bottom = `${this.y}px`;
    }
    positionChange(secondsPassed) {
        this.x += this.speedXPxPerSec * secondsPassed;
        this.y += this.speedYPxPerSec * secondsPassed;
    }
    // Calculating state of the object after secondsPassed seconds.
    updateState(secondsPassed) {
        this.positionChange(secondsPassed);
    }
}
