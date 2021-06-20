import { $, addEvent } from './utils.js';
import { MESSAGE } from './constants.js';
import Car from './components/car.js';

export default class RacingGame {
  constructor(container) {
    this.container = container;
    this.cars = [];
    this.gameCount = 0;

    this.init();
    this.bindEvent();
  }

  init() {
    // this.gameForm = $({ target: this.container, selector: '.game-form' });
    this.carnameForm = $({
      target: this.container,
      selector: '.carname-form',
    });
    this.carnameInput = $({
      target: this.carnameForm,
      selector: 'input',
    });
    this.carnameButton = $({
      target: this.carnameForm,
      selector: 'button',
    });

    this.gamecountForm = $({
      target: this.container,
      selector: '.gamecount-form',
    });
    this.gamecountInput = $({
      target: this.gamecountForm,
      selector: 'input',
    });
    this.gamecountButton = $({
      target: this.gamecountForm,
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
      el: this.carnameForm,
      type: 'submit',
      callback: this.registerCars,
    });

    addEvent({
      el: this.gamecountForm,
      type: 'submit',
      callback: this.registerCount,
    });

    addEvent({
      el: this.restartButton,
      type: 'click',
      callback: this.restartGame,
    });
  }

  registerCars = e => {
    e.preventDefault();
    const carNames = this.carnameInput.value.split(',');
    const validCarNames =
      carNames &&
      carNames.every(car => {
        const carnameLength = car.trim().length;
        return carnameLength > 0 && carnameLength <= 5;
      });
    if (!validCarNames) {
      return alert(MESSAGE.NAME_LENGTH_ERROR);
    }

    this.carnameInput.setAttribute('readOnly', true);
    this.carnameButton.setAttribute('disabled', true);
    this.cars = carNames.map(carname => new Car(carname));

    this.gamecountForm.hidden = false;
  };

  registerCount = e => {
    e.preventDefault();
    const count = this.gamecountInput.valueAsNumber;
    if (count <= 0) {
      return alert(MESSAGE.COUNT_MINIMUM_ERROR);
    }
    if (isNaN(count)) {
      return alert(MESSAGE.COUNT_ONLY_NUM_ERROR);
    }
    this.gameCount = count;
    this.gamecountInput.setAttribute('readOnly', true);
    this.gamecountButton.setAttribute('disabled', true);
    this.trackContainer.hidden = false;
    this.startGame();
  };

  startGame = () => {
    if (!this.cars || !this.gameCount) {
      return alert('참여자가 없거나 횟수를 지정하지 않았습니다.');
    }

    this.remainCount = this.gameCount;
    this.cars.map(car => {
      car.setPlayer();
      this.tracks.appendChild(car.getPlayer());
    });

    this.timer = setInterval(() => {
      this.cars.map(car => {
        car.moveOrNot() && car.move();
      });
      this.remainCount--;

      if (this.remainCount === 0) {
        this.finishGame();
      }
    }, 1000);

    // this.timer = function () {
    //   if (this.gameCount === 0) {
    //     this.finishGame();
    //   } else {
    //     this.cars.map(car => {
    //       car.moveOrNot() && car.move();
    //     });
    //     this.gameCount--;
    //     requestAnimationFrame(this.timer);
    //   }
    // };
    // requestAnimationFrame(this.timer);
  };

  finishGame = () => {
    clearInterval(this.timer);
    // cancelAnimationFrame(this.timer);
    this.cars.map(car => car.finish());

    const winnerName = this.findWinner().map(winner => winner.name);
    this.resultWinner.innerText = winnerName.join(',');
    this.resultContainer.hidden = false;

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
    this.gamecountForm.hidden = true;

    this.tracks.innerHTML = '';
    this.trackContainer.hidden = true;

    this.resultWinner.innerText = '';
    this.resultContainer.hidden = true;
  };
}
