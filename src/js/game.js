import { $, addEvent } from './utils.js';
import { MESSAGE } from './constants.js';

export default class RacingGame {
  constructor(container) {
    this.container = container;
    this.cars = [];
    this.gameCount = 0;

    this.init();
    this.bindEvent();
  }

  init() {
    this.carnameContainer = $({
      target: this.container,
      selector: '.carname-container',
    });
    this.carnameInput = $({
      target: this.carnameContainer,
      selector: 'input',
    });
    this.carnameButton = $({
      target: this.carnameContainer,
      selector: 'button',
    });

    this.gamecountContainer = $({
      target: this.container,
      selector: '.gamecount-container',
    });
    this.gamecountInput = $({
      target: this.gamecountContainer,
      selector: 'input',
    });
    this.gamecountButton = $({
      target: this.gamecountContainer,
      selector: 'button',
    });

    this.trackContainer = $({
      target: this.container,
      selector: '.track-container',
    });

    this.resultContainer = $({
      target: this.container,
      selector: '.result-container',
    });
    this.resultWinner = $({
      target: this.resultContainer,
      selector: '.winner',
    });
    this.restartButton = $({
      target: this.resultContainer,
      selector: '.restart',
    });
  }

  bindEvent() {
    addEvent({
      el: this.carnameButton,
      type: 'click',
      callback: this.registerCars.bind(this),
    });

    addEvent({
      el: this.gamecountButton,
      type: 'click',
      callback: this.registerCount.bind(this),
    });

    addEvent({
      el: this.restartButton,
      type: 'click',
      callback: this.restartGame.bind(this),
    });
  }

  registerCars = () => {
    const carNames = this.carnameInput.value.split(',');
    const validCarNames =
      carNames && carNames.every(car => car.trim().length > 0);
    if (!validCarNames) {
      alert(MESSAGE.NAME_ERROR);
      return;
    }
    this.cars = carNames;
    this.carnameInput.setAttribute('readOnly', true);
    this.carnameButton.setAttribute('disabled', true);
  };

  registerCount = () => {
    const count = this.gamecountInput.valueAsNumber;
    if (count <= 0 || isNaN(count)) {
      alert(MESSAGE.COUNT_ERROR);
      return;
    }
    this.gameCount = count;
    this.gamecountInput.setAttribute('readOnly', true);
    this.gamecountButton.setAttribute('disabled', true);
    this.startGame();
  };

  startGame = () => {
    if (this.cars.length === 0 || !this.gameCount) {
      console.log('you can not');
      return;
    }
    console.log('you can start game');
    console.log(this.cars, this.gameCount);
  };

  restartGame = () => {
    console.log('restartgame');
  };
}
