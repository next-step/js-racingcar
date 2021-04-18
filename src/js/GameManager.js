import { getEl, getEls, disabledEl } from './util.js';
import { winnerTemplate } from './template.js';
import { MESSAGES, VALIDATION, TIMER } from './constant.js';

import Car from './Car.js';

class GameManager {
    constructor() {
        this.carNames = [];
        this.cars = [];
        this.goalCount = 0;
        this.winners = [];
        this.gameOverCheckTimerId = null;
        this.congratsTimerId = null;
        this.isGameOver = false;
        this.init();
    }

    init() {
        getEl('#submit-car-name').addEventListener('click', this.setCarNames.bind(this));
        getEl('#submit-race-times').addEventListener('click', this.setGoalCount.bind(this));
        getEl("#race-result").addEventListener('click', this.resultClickHandler.bind(this));
    }

    setCarNames({ target }) {
        const inputEl = getEl('#input-car-name');
        const str = inputEl.value.replace(/ /g, '');
        const carNames = str.split(',');

        if (!str || !this._checkNameValidation(carNames)) return alert(MESSAGES.INVALID_CAR_NAME);
        this.carNames = carNames;
        getEl('#race-times-field').classList.toggle('show');
        disabledEl(target, inputEl);
    }

    _checkNameValidation(carNames) {
        return !carNames.some(car => car.length > VALIDATION.MAX_CAR_NAME_LENGTH);
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
        this.cars = this.carNames.map((name, idx) => new Car({ name, idx, manager: this }));
        this.gameOverCheckTimerId = setInterval(this._checkGameOver.bind(this), TIMER.GAME_OVER_CHECK);
    }

    _checkGameOver() {
        if (!this.winners.length) return;
        clearInterval(this.gameOverCheckTimerId);

        this.isGameOver = true;
        getEl('#race-result').innerHTML = winnerTemplate(this.winners);
        getEls('.spinner-container').forEach(el => el.classList.add('hide'));

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

        this.cars.forEach(car => car.clearCar());
        this._initProperties();
        getEl('#race-times-field').classList.toggle('show');
        getEl('#race-progress').innerHTML = '';
        getEl('#race-result').innerHTML = '';
        getEls('.interactive-element').forEach(el => {
            if (el.value) el.value = '';
            el.removeAttribute('disabled')
        });
    }

    _initProperties() {
        this.carNames = [];
        this.cars = [];
        this.goalCount = 0;
        this.winners = [];
        this.gameOverCheckTimerId = null;
        this.congratsTimerId = null;
        this.isGameOver = false;
    }
}

export default GameManager
