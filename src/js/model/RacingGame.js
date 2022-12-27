/* eslint-disable no-param-reassign */
import randomCarMoveStrategy from '../RandomCarMoveStrategy.js';

export default class RacingGame {
  carList;

  trialCount;

  constructor(carList, trialCount) {
    this.carList = carList;
    this.trialCount = trialCount;
  }

  setRunning() {
    this.carList.forEach($car => {
      this.runningLap($car);
    });
  }

  runningLap(car) {
    car.process.forEach((_, index) => {
      car.process[index] = car.run(randomCarMoveStrategy);
    });
  }

  getMaxDistance() {
    let maxDistance = 0;
    this.carList.forEach(car => {
      maxDistance = Math.max(maxDistance, car.distance);
    });
    return maxDistance;
  }

  getWinners() {
    return this.carList.reduce((acc, car) => {
      if (car.distance === this.getMaxDistance()) return [...acc, car.name];
      return acc;
    }, []);
  }

  getResult = () => this.carList.map(car => [car.name, car.distance]);
}
