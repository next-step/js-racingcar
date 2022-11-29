import { CAR_RACE } from './constant.js';
import { Car } from './model/Car.js';
import { getCarName, getTrialTimes, renderRace } from './ui/dom.js';
import { getNumberList, shuffle } from './utils/util.js';

export const readyRace = () => {
  const cars = getCarName().map((name) => new Car(name));
  const times = getTrialTimes();
  renderRace();
  return { cars, times };
};

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
    }, 1000);
  });
};
