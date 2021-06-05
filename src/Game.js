import { $, eventHandler } from './utils/utils.js';
import { MESSAGE } from './utils/constants.js';
import tryField from './components/TryField.js';

function Game() {
  const form = $('form');
  const carNameInput = $('#car-name-input');
  const carNameBtn = $('#car-name-btn');

  this.checkCarLength = (carNames) => {
    return carNames.split(',').find((car) => car.length > 5);
  };

  this.onClickCarNameBtn = (e) => {
    e.preventDefault();
    const carNames = carNameInput.value;
    if (this.checkCarLength(carNames)) {
      alert(MESSAGE.NAME_ALERT);
      return;
    }
  };

  this.init = () => {
    eventHandler({
      el: carNameBtn,
      type: 'click',
      callback: this.onClickCarNameBtn,
    });
  };

  this.init();
}

export default Game;
