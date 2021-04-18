import { carTemplate, forwardTemplate } from './template.js';
import { getEl } from './util.js';
import { VALIDATION, TIMER } from './constant.js';

class Car {
    constructor({ name, idx, manager }) {
        this.name = name;
        this.id = idx;
        this.count = 0;
        this.manager = manager;
        this.goTimerId = null;
        this.raceProgressEl = getEl('#race-progress');
        this.forwardIconWrapEl = null;
        this.init();
    }

    init() {
        this.goTimerId = setInterval(this.go.bind(this), TIMER.GO);
        this.raceProgressEl.innerHTML += carTemplate({ id: this.id, name: this.name });
    }

    go() {
        if (this.manager.isGameOver) return clearInterval(this.goTimerId);
        if (!this.isGo()) return;
        if (!this.forwardIconWrapEl) this.forwardIconWrapEl = getEl(`#car-${this.id} .forward-icon-wrap`);

        this.forwardIconWrapEl.innerHTML += forwardTemplate();
        if (++this.count === this.manager.goalCount) return this.manager.winners.push(this.name);
    }

    isGo() {
        const num = Math.floor(Math.random() * VALIDATION.MAX_RANDOM_NUMVER);
        return num > VALIDATION.GO_CONDITION;
    }

    clearCar() {
        clearInterval(this.goTimerId);
    }
}

export default Car
