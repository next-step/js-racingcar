import { carTemplate, forwardTemplate } from './template.js';
import { getEl, isMove } from './util.js';
import { TIMER } from './constant.js';

class Car {
    constructor({ name, idx, manager }) {
        this.name = name;
        this.id = idx;
        this.manager = manager;
        this.count = 0;
        this.moveTimerId = null;
        this.forwardIconWrapEl = null;
        this.raceProgressEl = getEl('#race-progress');
    }

    start() {
        this.moveTimerId = setInterval(this.move.bind(this), TIMER.MOVE);
        this.raceProgressEl.innerHTML += carTemplate({ id: this.id, name: this.name });
    }

    move() {
        if (this.manager.isGameOver) return clearInterval(this.moveTimerId);
        if (!isMove()) return;
        if (!this.forwardIconWrapEl) this.forwardIconWrapEl = getEl(`#car-${this.id} .forward-icon-wrap`);

        this.forwardIconWrapEl.innerHTML += forwardTemplate();
        if (++this.count === this.manager.goalCount) return this.manager.winners.push(this.name);
    }

    clear() {
        clearInterval(this.moveTimerId);
    }
}

export default Car
