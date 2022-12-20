import { race } from '../gameStrategy.js';

const GENERATION_MIN = 0;
const GENERATION_MAX = 9;

export default class RacingGame {
  carList;

  trialCount;

  constructor(carList, trialCount) {
    this.carList = carList;
    this.trialCount = trialCount;
  }

  isMove() {
    const randomNumber = race('getRandomNumber', {
      GENERATION_MIN,
      GENERATION_MAX,
    });

    return race('isGoOrStop', randomNumber);
  }

  run() {
    this.carList.forEach(car => {
      new Array(this.trialCount).fill(false).forEach(_ => this.isMove() && car.move());
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
