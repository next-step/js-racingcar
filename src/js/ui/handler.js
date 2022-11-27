import { Car } from '../service/Car.js';
import { CAR_RACING } from '../service/constant.js';
import { generateNumber } from '../util/validator.js';
import { ELEMENT } from './element.js';
import { removeClass } from './function.js';
import { selector } from './selector.js';
import { getAttemtTimesInput, getCarNamesFromInput, validateAttemptTimes, validateCarNames } from './validator.js';

export const handleCarNames = () => {
  try {
    validateCarNames();
    removeClass(selector(ELEMENT.FIELD.ATTEMPT_TIMES), 'hidden');
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

export const handleAttemptTimes = () => {
  try {
    validateAttemptTimes();
    removeClass(selector(ELEMENT.SECTION.CAR_RACING), 'hidden');
    // 도메인 영역으로 분리시킬 필요가 있다
    const winner = startGame(getCarNamesFromInput(), getAttemtTimesInput());
    console.log(winner);
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

// 도메인 영역으로 분리시킬 필요가 있다 (handler라고 보기에는 너무 아닌..)
/**
 *
 * @param {string[]} carNames
 * @param {number} attemptTimes
 * @returns {string}
 */
function startGame(carNames, attemptTimes) {
  const cars = carNames.map((carName) => new Car(carName));
  for (let i = 0; i < attemptTimes; i++) {
    cars.forEach((car) => car.moveForward(generateNumber(CAR_RACING.RANDOM_VALUE.MIN, CAR_RACING.RANDOM_VALUE.MAX)));
  }
  const winnerMovedDistance = Math.max(...cars.map((car) => car.getMovedDistance()));
  return cars.filter((car) => car.getMovedDistance() === winnerMovedDistance);
}
