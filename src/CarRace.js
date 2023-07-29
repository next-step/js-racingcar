import { RACE_CONFIGURE } from './constants/index';
import { generateRandomNumber, printRace, printResult } from './utils/index';

export default class CarRace {
  #cars = [];

  #rank = [];

  #winners = [];

  #maxLap = RACE_CONFIGURE.MAX_LAP;

  #minSpeed = RACE_CONFIGURE.MIN_SPEED;

  #maxSpeed = RACE_CONFIGURE.MAX_SPEED;

  #moveCondition = RACE_CONFIGURE.MOVE_CONDITION;

  #track = RACE_CONFIGURE.TRACK;

  #lap = 0;

  constructor(cars) {
    this.#cars = cars;
    this.#rank = cars;
  }

  #isRaceNotDone() {
    return this.#lap < this.#maxLap;
  }

  #getDistance() {
    return generateRandomNumber(this.#minSpeed, this.#maxSpeed);
  }

  #isMovable(distance) {
    return distance >= this.#moveCondition;
  }

  #setRank() {
    this.#rank = this.#cars
      .sort((a, b) => b.movedTrack - a.movedTrack)
      .map((car) => ({ name: car.name, moved: car.movedTrack }));
  }

  #setWinners() {
    const maxMove = this.#rank.reduce(
      (max, car) => (car.moved > max.moved ? car : max),
      this.#rank[0]
    ).moved;
    this.#winners = this.#rank.filter((car) => car.moved === maxMove).map((car) => car.name);
  }

  nextLap() {
    if (this.#isRaceNotDone()) {
      this.#lap += 1;
    }
  }

  race() {
    this.#cars.forEach((car) => {
      const distance = this.#getDistance();
      car.move(this.#isMovable(distance));
    });
    this.#setRank();
  }

  print() {
    this.#cars.forEach((car) => {
      printRace(car.name, car.movedTrack, this.#track);
    });
  }

  result() {
    this.#setWinners();
    printResult(this.#winners);
  }

  checkRaceStatus() {
    return this.#isRaceNotDone();
  }

  getCurrentLap() {
    return this.#lap;
  }
}
