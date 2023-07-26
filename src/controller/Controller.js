export class Controller {
  static MAXIMUM_CAR_NAME_LENGTH = 5;
  static FORWARD_THRESHOLD = 4;
  #cars = [];

  race = () => {
    this.#currentRaceNumber += 1;
    this.#cars.forEach(car => {
      if (this.canForward()) {
        car.move();
      }
    });
  };

  canForward = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber >= Controller.FORWARD_THRESHOLD;
  };

  isValidCarNames = carNames => {
    return carNames.every(carName => carName.length <= Controller.MAXIMUM_CAR_NAME_LENGTH);
  };
}
