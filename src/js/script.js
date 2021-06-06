import { $, $$ } from './utils/utils.js';
import { MESSAGE } from './constants.js';

const addEvent = ({ el, type, callback }) => {
  el.addEventListener(type, callback);
};

const inputCar = $('.input-carname');
const inputCount = $('.input-count');

function Racing() {
  let cars = [];
  let gameCount = 0;

  const registerCars = () => {
    const carNames = $$({ target: inputCar, selector: 'input' }).value.split(
      ','
    );
    const validCarNames =
      carNames && carNames.every(car => car.trim().length > 0);
    if (!validCarNames) {
      alert(MESSAGE.NAME_ERROR);
    } else {
      console.log('cars', carNames);
      cars = carNames;
    }
  };

  const registerCount = () => {
    const count = $$({ target: inputCount, selector: 'input' }).valueAsNumber;
    if (count <= 0) {
      alert(MESSAGE.COUNT_ERROR);
    } else {
      console.log('count', count);
      gameCount = count;
      startGame();
    }
  };

  const startGame = () => {
    if (cars && gameCount) {
      console.log('you can start game');
    } else {
      console.log('you can not');
    }
  };

  const init = () => {
    // console.log('init project');
    addEvent({
      el: $$({ target: inputCar, selector: 'button' }),
      type: 'click',
      callback: registerCars,
    });

    addEvent({
      el: $$({ target: inputCount, selector: 'button' }),
      type: 'click',
      callback: registerCount,
    });
  };

  document.addEventListener('DOMContentLoaded', () => init());
}

Racing();
