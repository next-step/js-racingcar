import { $, hide } from '../../utils/dom.js';
import { generateRandomNumberUnder, range } from '../../utils/index.js';

const template = {
  forward: () => `
    <div class="forward-icon mt-2">⬇️️</div>
  `,
  spinner: () => `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  `,
  car: (carName, idx) => `
  <div class="mr-2" data-car-name="${carName}-${idx}">
    <div class="car-player">${carName}</div>
  </div>
  `,
};

const removeChild = ($el) => {
  while ($el.hasChildNodes()) {
    $el.firstChild.remove();
  }
};

const MIN_NUMBER_TO_MOVE = 4;
const getRandomMovingResults = (times, minNumberToMove = MIN_NUMBER_TO_MOVE) =>
  range(times)
    .map(() => generateRandomNumberUnder())
    .map((n) => n >= minNumberToMove);

const generateMovements = (carNames, times) =>
  carNames.map((carName) => ({
    carName,
    forwards: getRandomMovingResults(times),
  }));

const Cars = ($el, store) => {
  const render = () => {
    removeChild($el);
    const carNames = store.getState('carNames');

    $el.insertAdjacentHTML(
      'afterbegin',
      carNames.map((carName, idx) => template.car(carName, idx)).join('')
    );

    hide($el, false);
  };

  const mutateRandomNumbers = () => {
    const { carNames, times } = store.getState();
    store.setState({
      movements: generateMovements(carNames, times),
    });
  };

  const moveCar = ({ carName, forwards }, idx) => {
    const $car = $(`[data-car-name="${carName}-${idx}"]`, $el);
    const _template = forwards.filter(Boolean).map(template.forward).join('');

    $car.insertAdjacentHTML('beforeend', _template);
  };

  const renderForward = (randomNumbers) => randomNumbers.forEach(moveCar);

  hide($el, true);

  store.subscribe({ key: 'times', listeners: [render, mutateRandomNumbers] });
  store.subscribe({
    key: 'init',
    listeners: [() => hide($el, true)],
  });
  store.subscribe({
    key: 'movements',
    listeners: [renderForward],
  });
};

export default Cars;
