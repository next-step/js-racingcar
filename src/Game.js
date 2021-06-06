import { $, eventHandler, handleElement } from './utils/utils.js';
import { MESSAGE } from './utils/constants.js';

const { disableElement, showElement, hiddenElement } = handleElement;

function Game() {
  // const form = $('form');
  const carNameInput = $('#car-name-input');
  const carNameBtn = $('#car-name-btn');
  const tryCountSection = $('#try-count-section');
  let carNames;

  this.checkCarLength = (carNames) => {
    return carNames.split(',').find((car) => car.trim().length > 5);
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

  this.init = () => {
    eventHandler({
      el: carNameBtn,
      type: 'click',
      callback: this.onClickCarNameBtn,
    });

    eventHandler({
      el: carNameBtn,
      type: 'click',
      callback: this.onClickCarNameBtn,
    });
  };

  this.init();
}

export default Game;
