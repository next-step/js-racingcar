import { END_MESSAGE, TIME } from '../constants/index.js';
import { $, delay } from '../utils/index.js';
import { showEl } from '../view/common.js';
import { getCardBoardTemplate, getWinnerNamesTemplate } from '../view/Template.js';
import Car from './Car.js';

class CarManager {
  constructor() {
    this.timeoutId = undefined;
  }

  createCars(carNames) {
    return carNames.map((carName) => new Car(carName.trim()));
  }

  async runRound({ cars, count }) {
    const roundList = Array.from({ length: count }, (_, index) => index);

    for (const round of roundList) {
      await this.forwardCars(cars);
    }

    cars.forEach((car) => car.parkingCar());
    this.updateCarBoard(cars);
    this.carResultRender(cars);
  }

  async forwardCars(cars) {
    await delay(TIME.CAR_DELAY);
    cars.forEach((car) => car.forwardCar());
    this.updateCarBoard(cars);
  }

  getWinners(cars) {
    const maxDistance = Math.max(...cars.map((car) => car.processCount));
    return cars.filter((car) => car.processCount === maxDistance).map((car) => car.name);
  }

  updateCarBoard(cars) {
    $('#racing-board').innerHTML = getCardBoardTemplate(cars);
  }

  carResultRender(cars) {
    showEl($('#racing-result'));

    const winners = this.getWinners(cars);
    $('#racing-result #winner-names').innerHTML = getWinnerNamesTemplate(winners);
    this.setTimeoutResult();
  }

  setTimeoutResult() {
    this.timeoutId = setTimeout(() => {
      alert(END_MESSAGE);
    }, TIME.RESULT_ALERT);
  }

  cancelTimeoutResult() {
    clearTimeout(this.timeoutId);
  }
}

export default CarManager;
