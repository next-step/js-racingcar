import { getEl, getEls, disabledEl, checkNameValidation, resetGround } from './util.js';
import { winnerTemplate } from './template.js';
import { MESSAGES, VALIDATION, TIMER } from './constant.js';

import Car from './Car.js';

class GameManager {
    constructor() {
        this.cars = [];
        this.goalCount = 0;
        this.isGameOver = false;
        this.winners = [];
        this.gameOverCheckTimerId = null;
        this.congratsTimerId = null;
        this.init();
    }

    init() {
        getEl('#submit-car-name').addEventListener('click', this.setCars.bind(this));
        getEl('#submit-race-times').addEventListener('click', this.setGoalCount.bind(this));
        getEl("#race-result").addEventListener('click', this.resultClickHandler.bind(this));
    }

    setCars({ target }) {
        const inputEl = getEl('#input-car-name');
        const str = inputEl.value.replace(/ /g, '');
        const cars = str.split(',');

        if (!str || !checkNameValidation(cars)) return alert(MESSAGES.INVALID_CAR_NAME);
        this.cars = cars.map((name, idx) => new Car({ name, idx, manager: this }));
        getEl('#race-times-field').classList.toggle('show');
        disabledEl(target, inputEl);
    }

    setGoalCount({ target }) {
        const inputEl = getEl('#input-race-times');
        const num = +inputEl.value;

        if (isNaN(num) || num < VALIDATION.MIN_GOAL_COUNT) return alert(MESSAGES.INVALID_GOAL_COUNT);
        this.goalCount = num;
        disabledEl(target, inputEl);

        this._startGame();
    }

    _startGame() {
        this.cars.forEach(car => car.start());
        this.gameOverCheckTimerId = setInterval(this._checkGameOver.bind(this), TIMER.GAME_OVER_CHECK);
    }

    _checkGameOver() {
        if (!this.winners.length) return;

        this.isGameOver = true;
        getEl('#race-result').innerHTML = winnerTemplate(this.winners);
        getEls('.spinner-container').forEach(el => el.classList.add('hide'));

        clearInterval(this.gameOverCheckTimerId);
        this.congratsTimerId = setTimeout(() => {
            alert(MESSAGES.CONGRATS);
        }, TIMER.CONGRATS);
    }

    resultClickHandler({ target }) {
        if (target.id !== 'restart-button') return;
        this._resetGame();
    }

    _resetGame() {
        clearTimeout(this.congratsTimerId);

        this.cars.forEach(car => car.clear());
        this._resetProperties();
        resetGround();
    }

    _resetProperties() {
        this.cars = [];
        this.goalCount = 0;
        this.winners = [];
        this.gameOverCheckTimerId = null;
        this.congratsTimerId = null;
        this.isGameOver = false;
    }
}

export default GameManager
