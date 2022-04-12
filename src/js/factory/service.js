import { ERROR_MESSAGE, MAX_NAME_DIGITS, MOVE_CONDITION } from '../constants.js';
import {
  pipe,
  isDuplicatedArray,
  generateRandomNumbers,
  delayLoop,
  $element,
  $setAttributes,
} from '../helpers/index.js';
import useStore from './store.js';

const store = useStore();

const renderWinners = ({ winners }) => {
  const attrs = [{ attr: 'winners', value: winners }];
  $setAttributes({ target: 'result-section', attrs });
};

const parsedRacingGameWinner = cars => {
  const maxMoveCount = store.getState('maxMoveCount');
  const winners = cars
    .reduce((result, { name, moveCount }) => {
      if (maxMoveCount === moveCount) return [...result, name];
      return result;
    }, [])
    .join(', ');

  return { cars, winners };
};

const removeCarSpinner = ({ cars }) => {
  cars.forEach(({ name }) => {
    const $car = document.getElementById(name);
    $car.lastElementChild.remove();
  });

  return cars;
};

const renderCarMoveForward = selector => {
  const $car = document.getElementById(selector);
  const $moveArrow = $element(/*html*/ `<div class="forward-icon mt-2">⬇️️</div>`);
  $car.insertBefore($moveArrow, $car.lastElementChild);
};

const racing = ({ cars }) => {
  const dice = generateRandomNumbers({ count: cars.length });

  cars.forEach((car, index) => {
    if (dice[index] >= MOVE_CONDITION) {
      ++car.moveCount;
      renderCarMoveForward(car.name);
    }

    if (store.getState('maxMoveCount') >= car.moveCount) return;
    store.setState('maxMoveCount', car.moveCount);
  });
};

export const checkValidations = carNames => {
  const checkedLength = carNames.filter(carName => {
    if (carName.length > MAX_NAME_DIGITS) throw new Error(ERROR_MESSAGE.MUST_LESS_THAN);
    return carName;
  });

  if (isDuplicatedArray(checkedLength)) throw new Error(ERROR_MESSAGE.NOT_ACCEPT_DUPLICATED);

  return checkedLength;
};

export const racingWrapper = ({ tryCount, cars }) => {
  return delayLoop({
    limit: tryCount,
    func: racing,
    params: { cars },
    callback: pipe(removeCarSpinner, parsedRacingGameWinner, renderWinners),
  });
};
