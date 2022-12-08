import { ALERT_MESSAGE, CAR_RACING } from './constant.js';
import { generateNumber } from '../util/validator.js';
// eslint-disable-next-line no-unused-vars
import { Car } from './Car.js';
import { removeSpinners, updateCarsRut, updateWinners } from '../ui/function.js';
import { lazyStart } from '../util/delay.js';

/**
 *
 * @param {string[]} carNames
 * @param {number|string} attetmptTimes
 * @returns {function}
 */
export const setupRacingGame = (carNames, attemptTimes) => {
  const cars = carNames.map((carName) => new Car(carName));
  const someCarArrived = () => cars.some((car) => car.getMovedDistance() === times);
  const times = Number(attemptTimes);
  let winnerMovedDistance = 0;
  let step = undefined;
  let intervalId = undefined;

  const moveForwards = () => {
    if (step >= times || someCarArrived()) {
      finalizeGame();
      lazyStart(() => alert(ALERT_MESSAGE.GAME.FINALIZED), CAR_RACING.DELAY_FOR_ALERT_MESSAGE);
      return;
    }
    cars.forEach((car) => {
      const distance = generateNumber(CAR_RACING.RANDOM_VALUE.MIN, CAR_RACING.RANDOM_VALUE.MAX);
      if (distance >= CAR_RACING.CAR.CONDITION.FORWARD) {
        car.moveForward();
      }
    });
    step += 1;
    updateCarsRut(cars);
  };

  const getWinners = () => {
    winnerMovedDistance = Math.max(...cars.map((car) => car.getMovedDistance()));
    return cars.filter((car) => car.getMovedDistance() === winnerMovedDistance);
  };

  const finalizeGame = () => {
    removeSpinners();
    updateWinners(getWinners());
    clearInterval(intervalId);
  };

  return () => {
    updateCarsRut(cars);
    intervalId = setInterval(moveForwards, CAR_RACING.RACING_SPEED);
  };
};
