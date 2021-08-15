/*
  Base class for implementing moving objects on the screen.
*/
export default class MovingDiv {
  div:HTMLDivElement;

  x:number;

  y:number;

  width:number;

  height:number;

  speedXPxPerSec:number;

  speedYPxPerSec:number;

  constructor(
    startingX:number,
    startingY:number,
    width:number,
    height:number,
    speedXPxPerS:number,
    speedYPxPerS:number,
  ) {
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

  draw():void {
    this.div.style.left = `${this.x}px`;
    this.div.style.bottom = `${this.y}px`;
  }

  protected positionChange(secondsPassed:number):void {
    this.x += this.speedXPxPerSec * secondsPassed;
    this.y += this.speedYPxPerSec * secondsPassed;
  }

  // Calculating state of the object after secondsPassed seconds.
  updateState(secondsPassed:number):void {
    this.positionChange(secondsPassed);
  }
}
