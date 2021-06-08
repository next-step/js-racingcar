import { $, addEvent } from './utils.js';
import { MESSAGE } from './constants.js';
import Car from './car.js';

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
    this.tracks = $({ target: this.container, selector: '.tracks' });

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
      carNames &&
      carNames.every(car => car.trim().length > 0 && car.trim().length <= 5);
    if (!validCarNames) {
      alert(MESSAGE.NAME_ERROR);
      return;
    }

    this.carnameInput.setAttribute('readOnly', true);
    this.carnameButton.setAttribute('disabled', true);
    carNames.map(carname => this.cars.push(new Car(carname)));
    this.gamecountContainer.classList.remove('d-none');
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
    this.trackContainer.classList.remove('d-none');
    this.startGame();
  };

  startGame = () => {
    if (this.cars.length === 0 || !this.gameCount) {
      alert('참여자가 없거나 횟수를 지정하지 않았습니다.');
      return;
    }

    this.remainCount = this.gameCount;
    this.cars.map(car => {
      car.setPlayer();
      this.tracks.appendChild(car.getPlayer());
    });

    // this.timer = setInterval(() => {
    //   this.cars.map(car => {
    //     car.moveOrNot() && car.move();
    //   });
    //   this.remainCount--;

    //   if (this.remainCount === 0) {
    //     this.finishGame();
    //   }
    // }, 1000);

    this.timer = function () {
      if (this.remainCount === 0) {
        this.finishGame();
      } else {
        this.cars.map(car => {
          car.moveOrNot() && car.move();
        });
        this.remainCount--;
        requestAnimationFrame(callback);
      }
    };
    requestAnimationFrame(callback);
  };

  finishGame = () => {
    // clearInterval(this.timer);
    cancelAnimationFrame(this.timer);
    this.cars.map(car => car.finish());

    const winnername = this.findWinner().map(winner => winner.name);
    this.resultWinner.innerText = winnername.join(',');
    this.resultContainer.classList.remove('d-none');

    setTimeout(() => window.alert(MESSAGE.FINISH), 2000);
  };

  findWinner = () => {
    const longest = Math.max(...this.cars.map(car => car.distance));
    return this.cars.filter(car => car.distance === longest);
  };

  restartGame = () => {
    // console.log('restartgame');
    this.gameCount = 0;
    this.cars = [];

    this.carnameInput.value = '';
    this.carnameInput.removeAttribute('readOnly');
    this.carnameButton.removeAttribute('disabled');

    this.gamecountInput.value = '';
    this.gamecountInput.removeAttribute('readOnly');
    this.gamecountButton.removeAttribute('disabled');
    this.gamecountContainer.classList.add('d-none');

    this.tracks.innerHTML = '';
    this.trackContainer.classList.add('d-none');

    this.resultWinner.innerText = '';
    this.resultContainer.classList.add('d-none');
  };
}
