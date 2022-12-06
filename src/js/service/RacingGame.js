import { ALERT_MESSAGE, CAR_RACING } from './constant.js';
import { generateNumber } from '../util/validator.js';
// eslint-disable-next-line no-unused-vars
import { Car } from './Car.js';
import { removeSpinners, updateCarsRut, updateWinners } from '../ui/function.js';

/**
 *
 * @param {string[]} carNames
 * @param {number|string} attetmptTimes
 * @returns {function}
 */
export const RacingGame = (carNames, attemptTimes) => {
  const cars = carNames.map((carName) => new Car(carName));
  const someCarArrived = () => cars.some((car) => car.getMovedDistance() === times);
  const times = Number(attemptTimes);
  let winnerMovedDistance = 0;
  let current = 0;
  let intervalId = 0;

  const moveForwards = () => {
    if (current > times || someCarArrived()) {
      finalizeGame();
      setTimeout(() => alert(ALERT_MESSAGE.GAME.FINALIZED), CAR_RACING.RACING_SPEED);
      return;
    }
    cars.forEach((car) => {
      const distance = generateNumber(CAR_RACING.RANDOM_VALUE.MIN, CAR_RACING.RANDOM_VALUE.MAX);
      if (distance >= CAR_RACING.CAR.CONDITION.FORWARD) {
        car.moveForward();
      }
    });
    current += 1;
    updateCarsRut(cars);
  };

  /**
   *
   * @param {Car[]} wonCars
   */
  const setWinners = (wonCars) => {
    updateWinners(wonCars);
  };

  const getWinners = () => {
    winnerMovedDistance = Math.max(...cars.map((car) => car.getMovedDistance()));
    console.log(winnerMovedDistance);
    return cars.filter((car) => car.getMovedDistance() === winnerMovedDistance);
  };

  const finalizeGame = () => {
    removeSpinners();
    setWinners(getWinners());
    clearInterval(intervalId);
  };

  return () => {
    updateCarsRut(cars);
    intervalId = setInterval(moveForwards, CAR_RACING.RACING_SPEED);
    return getWinners;
  };
};
