/*
  Class for measuring time and showing it on display.
*/
export default class Timer {
    constructor(disp, color = 'black', stopColor = 'red', refreshIntervalMs = 100) {
        this.refreshIntervalMs = refreshIntervalMs;
        this.display = disp;
        this.color = color;
        this.stopColor = stopColor;
        this.reset();
    }
    // Returning how long timer is on in miliseconds.
    getTime() {
        if (this.endTime === null) {
            const now = new Date().getTime();
            return now - this.startTime + this.previousTime;
        }
        return this.endTime - this.startTime + this.previousTime;
    }
    start() {
        clearInterval(this.intervalId);
        this.reset();
        this.intervalId = setInterval(() => { this.update(); }, this.refreshIntervalMs);
    }
    reasume() {
        this.display.style.color = this.color;
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => { this.update(); }, this.refreshIntervalMs);
        if (this.endTime !== null) {
            this.previousTime += this.getTime();
            this.endTime = null;
            this.startTime = new Date().getTime();
        }
    }
    stop() {
        clearInterval(this.intervalId);
        this.endTime = new Date().getTime();
        this.update();
        this.display.style.color = this.stopColor;
    }
    reset() {
        this.startTime = new Date().getTime();
        this.endTime = null;
        this.previousTime = 0;
        this.display.innerText = '0:00:00';
        this.display.style.color = this.color;
    }
    update() {
        const time = this.getTime();
        this.display.innerText = Timer.parseTime(time);
    }
    static getDecisecondsPart(ms) {
        return Math.floor((ms % 1000) / 100);
    }
    static getSecondsPart(ms) {
        return Math.floor((ms % 60000) / 1000);
    }
    static getMinutesPart(ms) {
        return Math.floor(ms / 60000);
    }
    // Parsing time in ms to format mm:ss:deciseconds.
    static parseTime(time) {
        let parsed = `${Timer.getMinutesPart(time)}:`;
        const sec = Timer.getSecondsPart(time);
        if (sec < 10) {
            parsed += `0${sec}:`;
        }
        else {
            parsed += `${sec}:`;
        }
        parsed += `${this.getDecisecondsPart(time)}`;
        return parsed;
    }
}
