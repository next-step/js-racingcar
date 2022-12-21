import { CAR_RACE } from './constant.js';
import { renderForward } from './ui/dom.js';
import { getRandom } from './utils/random.js';

export const startRace = (cars, times) => {
  return new Promise((resolve) => {
    let count = 0;

    const intervalId = setInterval(() => {
      count += 1;
      cars.map((car) => {
        const forwardedStep = getRandom(CAR_RACE.MIN, CAR_RACE.MAX);
        if (forwardedStep >= CAR_RACE.FORWARD) {
          car.forwardStep();
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
  return raceResult
    .filter((car) => car.step === maxStep)
    .map((car) => car.name);
};
