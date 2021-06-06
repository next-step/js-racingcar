import { $, eventHandler, handleElement } from './utils/utils.js';
import { MESSAGE } from './utils/constants.js';

const { disableElement, showElement, hiddenElement } = handleElement;

function Game() {
  // const form = $('form');
  const carNameInput = $('#car-name-input');
  const carNameBtn = $('#car-name-btn');
  const tryCountSection = $('#try-count-section');
  const tryCountInput = $('#try-count-input');
  const tryCountBtn = $('#try-count-btn');
  let carNames;
  let gameCount;

  this.checkCarLength = (carNames) => {
    return carNames.split(',').find((car) => car.trim().length > 5);
  };

  this.checkGameCount = (count) => {
    return count < 1 || !Number.isInteger(count);
  };

  this.onClickCarNameBtn = (e) => {
    e.preventDefault();
    carNames = carNameInput.value;
    if (this.checkCarLength(carNames)) {
      alert(MESSAGE.NAME_ALERT);
      return;
    }
    [carNameInput, carNameBtn].forEach((el) => disableElement(el));
    showElement(tryCountSection);
  };

  this.onClickCarTryCountBtn = (e) => {
    e.preventDefault();
    gameCount = Number(tryCountInput.value);
    if (this.checkGameCount(gameCount)) {
      alert(MESSAGE.TRY_ALERT);
      return;
    }
    [tryCountInput, tryCountBtn].forEach((el) => disableElement(el));
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
