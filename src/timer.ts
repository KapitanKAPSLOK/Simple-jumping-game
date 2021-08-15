/*
  Class for measuring time and showing it on display.
*/
export default class Timer {
  startTime!:number;

  endTime!:number | null;

  // Sum of time timer was working before reasuming.
  previousTime!:number;

  display:HTMLElement;

  refreshIntervalMs:number;

  intervalId!: ReturnType<typeof setInterval>;

  // Default timer color.
  color:string;

  // Color timer will have after stoping.
  stopColor:string;

  constructor(disp:HTMLElement, color:string = 'black', stopColor:string = 'red', refreshIntervalMs:number = 100) {
    this.refreshIntervalMs = refreshIntervalMs;
    this.display = disp;
    this.color = color;
    this.stopColor = stopColor;
    this.reset();
  }

  // Returning how long timer is on in miliseconds.
  getTime():number {
    if (this.endTime === null) {
      const now:number = new Date().getTime();
      return now - this.startTime + this.previousTime;
    }
    return this.endTime - this.startTime + this.previousTime;
  }

  start():void {
    clearInterval(this.intervalId);
    this.reset();
    this.intervalId = setInterval(() => { this.update(); }, this.refreshIntervalMs);
  }

  reasume():void {
    this.display.style.color = this.color;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => { this.update(); }, this.refreshIntervalMs);
    if (this.endTime !== null) {
      this.previousTime += this.getTime();
      this.endTime = null;
      this.startTime = new Date().getTime();
    }
  }

  stop():void {
    clearInterval(this.intervalId);
    this.endTime = new Date().getTime();
    this.update();
    this.display.style.color = this.stopColor;
  }

  reset():void {
    this.startTime = new Date().getTime();
    this.endTime = null;
    this.previousTime = 0;
    this.display.innerText = '0:00:00';
    this.display.style.color = this.color;
  }

  update():void {
    const time:number = this.getTime();
    this.display.innerText = Timer.parseTime(time);
  }

  static getDecisecondsPart(ms:number):number {
    return Math.floor((ms % 1000) / 100);
  }

  static getSecondsPart(ms:number):number {
    return Math.floor((ms % 60000) / 1000);
  }

  static getMinutesPart(ms:number):number {
    return Math.floor(ms / 60000);
  }

  // Parsing time in ms to format mm:ss:deciseconds.
  static parseTime(time:number) {
    let parsed:string = `${Timer.getMinutesPart(time)}:`;
    const sec:number = Timer.getSecondsPart(time);
    if (sec < 10) {
      parsed += `0${sec}:`;
    } else {
      parsed += `${sec}:`;
    }
    parsed += `${this.getDecisecondsPart(time)}`;
    return parsed;
  }
}
