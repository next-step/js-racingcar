import { getEl, disabledEl } from './util.js';
import { winnerTemplate } from './template.js';
import Car from './Car.js';

class GameManager {
    constructor() {
        this.cars = [];
        this.goalCount = 0;
        this.winners = [];
        this.winnerCheckTimerId = null;
        this.isGameOver = false;
        this.init();
    }

    init() {
        getEl('#submit-car-name').addEventListener('click', this.setCars.bind(this));
        getEl('#submit-race-times').addEventListener('click', this.setGoalCount.bind(this));
    }

    setCars({ target }) {
        const inputEl = getEl('#input-car-name');
        const str = inputEl.value.replace(/ /g, '');
        const cars = str.split(',');

        if (!str || !this._checkNameValidation(cars)) return alert('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.');
        this.cars = cars;
        getEl('#race-times-field').classList.toggle('show');
        disabledEl(target, inputEl);
    }

    _checkNameValidation(cars) {
        return cars.some(car => !(car.length > 5));
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
        this.cars.forEach(name => new Car({ name, manager: this }));
        this.winnerCheckTimerId = setInterval(this._checkGameOver.bind(this), 1000);
    }

    _checkGameOver() {
        if (!this.winners.length) return;
        this.isGameOver = true;
        clearInterval(this.winnerCheckTimerId);
        getEl('#race-result-section').innerHTML = winnerTemplate(this.winners);
        setTimeout(() => {
            alert('🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇');
        }, 2000);
    }

    _resetGame() {
        this.cars = [];
        this.goalCount = 0;
        this.winners = [];
        this.winnerCheckTimerId = null;
        this.isGameOver = false;

        getEl('#race-times-field').classList.toggle('show');
        getEl('#race-progress-section').innerHTML = '';
        getEl('#race-result-section').innerHTML = '';
    }
}

export default GameManager
