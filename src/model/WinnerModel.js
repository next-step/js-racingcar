export class WinnerModel {
  winners;

  constructor(cars) {
    this.winners = cars
      .filter((car) => car.getPosition() === this.#getMaxPosition(cars))
      .map((car) => car.getName());
  }

  #getMaxPosition(cars) {
    return Math.max(...cars.map((car) => car.getPosition()));
  }
}
