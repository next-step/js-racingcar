import ValidationCheck from "../classes/ValidationCheck";
import inputCarNames from "../view/RacingView";

export default class RacingController {
  constructor() {
    this.cars = [];
  }

  getInputCarNames() {
    inputCarNames().then((carNames) => {
      this.settingCarNames(carNames);
    });
  }

  settingCarNames(carNames) {
    const carList = carNames.split(",");

    const validation = new ValidationCheck();

    validation.validateCarCount(carList);
    validation.validateEmptyName(carList);
    validation.validateDuplicateName(carList);
    validation.validateNameRegex(carList);
    validation.validateNameLength(carList);

    this.cars.push(carList);
  }
}
