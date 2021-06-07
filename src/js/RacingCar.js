import Car from './Car.js';
import { NAME_ERROR_MESSAGE, NUMBER_ERROR_MESSAGE, CONGRATS_MESSAGE } from './utils/constants.js';

export default class RacingCar {
    constructor() {
        this.cars = [];
        this.tryNum = 0;
        this.hideViews();
        this.registerEventListener();
    }

    setCars(names) {
        this.cars = names.map((name, i) => (new Car(name, i)));
    }

    setTryNum() {
        const $input = document.querySelectorAll('input')[1];
        const value = +$input.value;

        if (value < 1) {
            alert(NUMBER_ERROR_MESSAGE);
            return;
        }
        this.tryNum = value;
        this.startRacing();
    }

    hideViews() {
        const $tryNumField = document.querySelectorAll('fieldset')[1];
        const $sections = document.querySelectorAll('section');
        const $racingBoard = $sections[1];
        const $resultBoard = $sections[2];

        $tryNumField.style.visibility = 'hidden';
        $racingBoard.style.visibility = 'hidden';
        $resultBoard.style.visibility = 'hidden';
    }

    registerEventListener() {
        const $buttons = document.querySelectorAll('button');
        const $carNameButton = $buttons[0];
        const $tryNumButton = $buttons[1];
        const $retryButton = $buttons[2];

        $carNameButton.addEventListener('click', () => this.checkCarNames());
        $tryNumButton.addEventListener('click', () => this.setTryNum());
        $retryButton.addEventListener('click', () => this.retry());
    }

    renderResult() {
        const winners = this.getWinners();
        const $resultBoard = document.querySelectorAll('section')[2];
        const $h2 = $resultBoard.querySelector('h2');
        $h2.innerText = `🏆 최종 우승자: ${winners.join(', ')} 🏆`;
        this.changeVisibility($resultBoard, true);

        setTimeout(() => {
            alert(CONGRATS_MESSAGE);
        }, 2000);
    }

    changeVisibility(node, isVisible) {
        node.style.visibility = isVisible ? 'visible' : 'hidden';
    }

    checkCarNames() {
        const $input = document.querySelectorAll('input')[0];
        const value = $input.value;
        
        if (!value) {
            alert(NAME_ERROR_MESSAGE);
            return;
        }

        const names = value.split(/,\s*/);
        if (names.some((name) => name.length > 5 || name.length < 1)) {
            alert(NAME_ERROR_MESSAGE);
            return;
        }

        this.setCars(names);
        this.changeVisibility(document.querySelectorAll('fieldset')[1], true);
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    startRacing() {
        this.changeVisibility(document.querySelectorAll('section')[1], true);

        let i = 0;
        let last = 0;
        let isSpinnerRendered = false;
        const racing = (timestamp) => {
            if (i >= this.tryNum) {
                this.renderResult();
                return;
            }

            if (!last) {
                last = timestamp;
            } else {
                if (timestamp - last > 1000) {
                    isSpinnerRendered = false;
                    last = timestamp;
                    i++;
                    this.cars.forEach((car) => car.setRandom(this.getRandomNumber()));
                } else {
                    if (!isSpinnerRendered) {
                        this.cars.forEach((car) => car.renderSpinner());
                        isSpinnerRendered = true;
                    }
                }
            }
            window.requestAnimationFrame(racing);
        };
        window.requestAnimationFrame(racing);
    }

    getWinners() {
        const max = this.cars.reduce((prev, curr) => prev < curr.getForwardNum() ? curr.getForwardNum() : prev, 0);
        const winners = this.cars
                        .filter((car) => car.getForwardNum() === max)
                        .map((car) => car.getName());
        return winners;
    }

    retry() {
        const $inputs = document.querySelectorAll('input');
        const $nameInput = $inputs[0];
        const $tryNumInput = $inputs[1];
        $nameInput.value = '';
        $tryNumInput.value = '';

        const $board = document.querySelector('.mt-4');
        $board.innerHTML = '';

        this.cars = [];
        this.tryNum = 0;
        this.hideViews();
    }
}
