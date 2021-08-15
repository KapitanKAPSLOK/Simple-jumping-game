import MovingDiv from './moving_div.js';

export default class Player extends MovingDiv {
  // Initial jump velocity.
  jumpSpeed:number;

  // Gravitational constant.
  g:number;

  constructor(gravitationalConstant:number, jumpSpeed:number = 500) {
    super(200, 0, 10, 30, 0, 0);
    this.div.style.backgroundColor = 'red';
    this.jumpSpeed = jumpSpeed;
    this.g = gravitationalConstant;

    // Any key is jump.
    window.addEventListener('keypress', () => this.jump());
  }

  protected applyGravity(secondsPassed:number):void {
    if (this.y > 0) {
      this.speedYPxPerSec -= secondsPassed * this.g;
    } else {
      this.speedYPxPerSec = 0;
      this.y = 0;
    }
  }

  protected jump():void {
    if (this.speedYPxPerSec === 0) {
      this.speedYPxPerSec = this.jumpSpeed;
    }
  }

  updateState(secondsPassed:number):void {
    this.positionChange(secondsPassed);
    this.applyGravity(secondsPassed);
  }

  freeze():void {
    window.removeEventListener('keypress', () => this.jump());
  }

  isColliding(obj: MovingDiv):boolean {
    if (this.x > obj.x + obj.width
      || obj.x > this.x + this.width
      || this.y > obj.y + obj.height
      || obj.y > this.y + this.height) {
      return false;
    }
    return true;
  }
}
