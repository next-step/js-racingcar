import Car from './Car.js';
import { NAME_ERROR_MESSAGE, NUMBER_ERROR_MESSAGE } from './utils/constants.js';

export default class RacingCar {
    constructor() {
        this.cars = [];
        this.tryNum = 0;
        this.hideViews();
        this.registerEventListener();
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
        if (names.some((name) => name.length > 5)) {
            alert(NAME_ERROR_MESSAGE);
            return;
        }

        this.setCars(names);
        this.changeVisibility(document.querySelectorAll('fieldset')[1], true);
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

    getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    startRacing() {
        this.changeVisibility(document.querySelectorAll('section')[1], true);
        for (let i = 0; i < this.tryNum; i++) {
            this.cars.forEach((car) => car.setRandom(this.getRandomNumber()));
        }
        // 수정 예정
        this.renderResult();
    }

    renderResult() {
        const max = this.cars.reduce((prev, curr) => prev < curr.getForwardNum() ? curr.getForwardNum() : prev, 0);
        const winners = this.cars
                        .filter((car) => car.getForwardNum() === max)
                        .map((car) => car.getName());
        
        const $resultBoard = document.querySelectorAll('section')[2];
        const $h2 = $resultBoard.querySelector('h2');
        $h2.innerText = `🏆 최종 우승자: ${winners.join(', ')} 🏆`;
        this.changeVisibility($resultBoard, true);
    }

    retry() {
        const $nameInput = document.querySelectorAll('input')[0];
        $nameInput.value = '';
        this.hideViews();
    }
}
