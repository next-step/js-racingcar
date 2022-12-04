import { CAR_RACING } from './constant.js';
import { generateNumber } from '../util/validator.js';
// eslint-disable-next-line no-unused-vars
import { Car } from './Car.js';
import { updateCarsRut } from '../ui/function.js';

/**
 *
 * @param {string[]} carNames
 * @param {number|string} attetmptTimes
 * @returns {function}
 */
export const RacingGame = (carNames, attemptTimes) => {
  const cars = carNames.map((carName) => new Car(carName));
  const times = Number(attemptTimes);
  let winnerMovedDistance = 0;
  return () => {
    for (let i = 0; i < times; i++) {
      cars.forEach((car) => {
        const distance = generateNumber(CAR_RACING.RANDOM_VALUE.MIN, CAR_RACING.RANDOM_VALUE.MAX);
        if (distance >= CAR_RACING.CAR.CONDITION.FORWARD) {
          car.moveForward();
        }
      });
    }
    //TODO: 차 궤적 그리기는 추후 setTimeout 등 이벤트루프 개념과 연계된 코드 적용
    updateCarsRut(cars);
    winnerMovedDistance = Math.max(...cars.map((car) => car.getMovedDistance()));
    return cars.filter((car) => car.getMovedDistance() === winnerMovedDistance);
  };
};
