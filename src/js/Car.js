import { carTemplate, forwardTemplate } from './template.js';
import { getEl } from './util.js';

class Car {
    constructor({ name, idx, manager }) {
        this.name = name;
        this.id = idx;
        this.count = 0;
        this.manager = manager;
        this.progressTimerId = null;
        this.raceProgressEl = getEl('#race-progress');
        this.forwardIconWrapEl = null;
        this.init();
    }

    init() {
        this.progressTimerId = setInterval(this.go.bind(this), 1000);
        this.raceProgressEl.innerHTML += carTemplate({ id: this.id, name: this.name });
    }

    go() {
        if (this.manager.isGameOver) return clearInterval(this.progressTimerId);
        if (!this.isGo()) return;
        if (!this.forwardIconWrapEl) this.forwardIconWrapEl = getEl(`#car-${this.id} .forward-icon-wrap`);

        this.forwardIconWrapEl.innerHTML += forwardTemplate();
        if (++this.count === this.manager.goalCount) return this.manager.winners.push(this.name);
    }

    isGo() {
        const num = Math.floor(Math.random() * 10);
        return num > 3;
    }

    clearCar() {
        clearInterval(this.progressTimerId);
    }
}

export default Car
