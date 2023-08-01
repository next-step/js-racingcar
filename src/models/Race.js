import { ERROR_MESSAGE } from "../constants/Messages";
import { CAR, RACE } from "../constants/Numbers";

class Race {
  #cars;
  #winners;

  constructor(cars) {
    this.validateRace(cars);

    this.#cars = cars;
  }

  getCars() {
    return this.#cars;
  }

  getWinners() {
    return this.#winners;
  }

  getMaxPosition() {
    const maxPosition = this.#cars.reduce((prev, cur) => {
      if (cur.getPosition() >= prev) return cur.getPosition();
      else return prev;
    }, 0);

    return maxPosition;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  validateRace(cars) {
    const carNameArr = cars.map((car) => car.getName());
    const carNameSet = new Set(carNameArr);

    if (carNameArr.length < RACE.MIN_CAR_COUNT) {
      throw Error(ERROR_MESSAGE.MIN_CAR_COUNT_NOT_REACHED);
    }

    if (carNameArr.length !== carNameSet.size) {
      throw Error(ERROR_MESSAGE.DUPLICATE_NAME);
    }
  }

  playOneRound() {
    this.#cars.forEach((car) => {
      if (
        this.getRandomInt(RACE.MIN_ROLL_NUMBER, RACE.MAX_ROLL_NUMBER) >=
        CAR.RUN_THRESHOLD
      )
        car.move();
    });
  }

  pickWinners() {
    const maxPosition = this.getMaxPosition();

    const winners = this.#cars.reduce((prev, cur) => {
      if (cur.getPosition() === maxPosition) return [...prev, cur];
      else return prev;
    }, []);

    this.#winners = winners;
  }
}

export default Race;
