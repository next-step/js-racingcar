import { $, eventHandler, handleElement } from './utils/utils.js';
import { MESSAGE } from './utils/constants.js';
import player from './components/Player.js';

const { disableElement, showElement, hiddenElement } = handleElement;

function Game() {
  const carNameInput = $('#car-name-input');
  const carNameBtn = $('#car-name-btn');
  const tryCountSection = $('#try-count-section');
  const tryCountInput = $('#try-count-input');
  const tryCountBtn = $('#try-count-btn');
  const gameArea = $('#game-area');
  let carNames;
  let gameCount;

  this.decideGoStop = () => {
    const cars = document.querySelectorAll('div[data-player]');
    cars.forEach((item) => console.log(item.innerHTML));
  };

  this.startGame = () => {
    gameArea.innerHTML = this.setCars(carNames);

    for (let i = 0; i < gameCount; i++) {
      this.decideGoStop();
    }
  };

  this.checkCarLength = (carNames) => {
    return carNames.split(',').find((car) => car.trim().length > 5);
  };

  this.checkGameCount = (count) => {
    return Number(count) < 1 || !Number.isInteger(Number(count));
  };

  this.setCars = (cars) => {
    return cars.reduce((html, car) => {
      return (html += player({ name: car.trim() }));
    }, '');
  };

  this.onClickCarNameBtn = (e) => {
    e.preventDefault();
    if (this.checkCarLength(carNameInput.value)) {
      alert(MESSAGE.NAME_ALERT);
      return;
    }
    carNames = carNameInput.value.split(',').map((car) => car.trim());
    [carNameInput, carNameBtn].forEach((el) => disableElement(el));
    showElement(tryCountSection);
  };

  this.onClickCarTryCountBtn = (e) => {
    e.preventDefault();
    if (this.checkGameCount(tryCountInput.value)) {
      alert(MESSAGE.TRY_ALERT);
      return;
    }
    gameCount = Number(tryCountInput.value);
    [tryCountInput, tryCountBtn].forEach((el) => disableElement(el));
    this.startGame();
  };

  this.init = () => {
    eventHandler({
      el: carNameBtn,
      type: 'click',
      callback: this.onClickCarNameBtn,
    });

    eventHandler({
      el: tryCountBtn,
      type: 'click',
      callback: this.onClickCarTryCountBtn,
    });
  };

  this.init();
}

export default Game;
