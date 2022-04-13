import {
  ERROR_MESSAGE,
  MAX_NAME_DIGITS,
  MOVE_CONDITION,
  RESULT_ALERT_DELAY,
} from '../constants.js';
import {
  pipe,
  isDuplicatedArray,
  generateRandomNumbers,
  delay,
  delayLoop,
  $element,
  $setAttributes,
  $show,
} from '../helpers/index.js';
import useStore from './store.js';

const store = useStore();

const renderWinners = ({ winners }) => {
  const attributes = [['winners', winners]];

  $setAttributes('result-section', attributes);
};

const parsedRacingGameWinner = cars => {
  const maxMoveCount = store.getState('maxMoveCount');
  const winners = cars.reduce(
    (result, { name, moveCount }) => (maxMoveCount === moveCount ? `${result}, ${name}` : result),
    '',
  );

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
  store.initStore();

  return delayLoop({
    limit: tryCount,
    func: racing,
    params: { cars },
    callback: pipe(removeCarSpinner, parsedRacingGameWinner, renderWinners),
  });
};

const congratulationsOnWinning = async winners => {
  await delay(RESULT_ALERT_DELAY);
  alert(`이번 레이싱 게임의 승자는\n\n${winners} 입니다!\n\n✨축하해요✨`);
  $show('#game-reset-area');
};

export const renderResetArea = winners => {
  document.getElementById('winners').textContent = winners;
  congratulationsOnWinning(winners);
};
