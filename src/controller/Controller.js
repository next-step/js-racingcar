export class Controller {
  static MAXIMUM_RACING_NUMBER = 5;

  isValidCarNames = carNames => {
    return carNames.every(carName => carName.length <= Controller.MAXIMUM_CAR_NAME_LENGTH);
  };
}
