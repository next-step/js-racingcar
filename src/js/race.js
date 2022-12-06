import { CAR_RACE } from './constant.js';
import { getNumberList, shuffle } from './utils/util.js';

export const startRace = (cars, times) => {
  return new Promise((resolve) => {
    let count = 0;
    const intervalId = setInterval(() => {
      count += 1;
      cars.map((car) =>
        car.forwardStep(shuffle(getNumberList(CAR_RACE.MAX), CAR_RACE.COUNT))
      );
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
