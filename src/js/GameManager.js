import { getEl, getEls, disabledEl } from './util.js';
import { winnerTemplate } from './template.js';
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

        if (!str || !this._checkNameValidation(carNames)) return alert('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.');
        this.carNames = carNames;
        getEl('#race-times-field').classList.toggle('show');
        disabledEl(target, inputEl);
    }

    _checkNameValidation(carNames) {
        return carNames.some(car => !(car.length > 5));
    }

    setGoalCount({ target }) {
        const inputEl = getEl('#input-race-times');
        const num = +inputEl.value;

        if (isNaN(num) || num <= 0) return alert('입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.');
        this.goalCount = num;
        disabledEl(target, inputEl);

        this._startGame();
    }

    _startGame() {
        this.cars = this.carNames.map((name, idx) => new Car({ name, idx, manager: this }));
        this.gameOverCheckTimerId = setInterval(this._checkGameOver.bind(this), 1000);
    }

    _checkGameOver() {
        if (!this.winners.length) return;
        clearInterval(this.gameOverCheckTimerId);

        this.isGameOver = true;
        getEl('#race-result').innerHTML = winnerTemplate(this.winners);
        getEls('.spinner-container').forEach(el => el.classList.add('hide'));

        this.congratsTimerId = setTimeout(() => {
            alert('🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇');
        }, 2000);
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
