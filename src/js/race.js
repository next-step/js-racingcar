import { CAR_RACE, WINNER_MESSAGE } from './constant.js';
import { renderForward } from './ui/dom.js';
import { getRandom } from './utils/util.js';

export const startRace = (cars, times) => {
  return new Promise((resolve) => {
    let count = 0;

    const intervalId = setInterval(() => {
      count += 1;
      cars.map((car) => {
        const forwardedStep = getRandom(CAR_RACE.MIN, CAR_RACE.MAX);
        if (forwardedStep >= CAR_RACE.FORWARD) {
          car.forwardStep(forwardedStep);
          renderForward(car.name);
        }
      });

      if (count === times) {
        clearInterval(intervalId);
        resolve(cars);
      }
    }, CAR_RACE.INTERVAL);
  });
};

export const getWinner = (raceResult) => {
  const maxStep = Math.max(...raceResult.map((car) => car.step));
  setTimeout(() => alert(WINNER_MESSAGE), 2000);
  return raceResult
    .filter((car) => car.step === maxStep)
    .map((car) => car.name);
};
