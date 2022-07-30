import { Car } from "./Car.js";
import { NotableError, noticeError } from "./utils/NotableError.js";
import { CAR_NAME_INPUT, CAR_GENERATE_BUTTON } from "./utils/selector.js";
import { CAR_FACTORY_ERROR_MESSAGES } from "./utils/errorMessage.js";
import { CAR_NAME_SEPARATOR, MAX_CAR_NAME_LENGTH } from "./utils/constant.js";
import { isDuplicated, isEmptyString, isFunction, isHTMLFormElement } from "./utils/validator.js";

export class CarFactory {
  $form;
  $input;
  $carContainer;
  onCarsGenerated;

  constructor($form, { onCarsGenerated, $carContainer } = {}) {
    if (!isHTMLFormElement($form)) {
      throw new TypeError(`${$form} is not a HTMLFormElement`);
    }

    if (!isFunction(onCarsGenerated)) {
      throw new TypeError(`${onCarsGenerated} is not a function`);
    }

    this.$carContainer = $carContainer;
    this.$form = $form;
    this.$input = $form.querySelector(CAR_NAME_INPUT);
    this.$button = $form.querySelector(CAR_GENERATE_BUTTON);

    this.onCarsGenerated = onCarsGenerated;
    this.addEventHandlers();
  }

  validateCarName(carName) {
    if (isEmptyString(carName)) {
      throw new NotableError(CAR_FACTORY_ERROR_MESSAGES.CAR_NAME_IS_EMPTY);
    }

    if (carName.length > MAX_CAR_NAME_LENGTH) {
      throw new NotableError(CAR_FACTORY_ERROR_MESSAGES.CAR_NAME_LOGGER_THAN_MAX_LENGTH);
    }
  }

  isValidCarNames(carNames) {
    try {
      if (isDuplicated(carNames)) {
        throw new NotableError(CAR_FACTORY_ERROR_MESSAGES.CAR_NAMES_DUPLICATED);
      }
      carNames.forEach((name) => this.validateCarName(name));
      return true;
    } catch (error) {
      noticeError(error, this.focusInput.bind(this));
      return false;
    }
  }

  getCarNames(e) {
    const carNames = new FormData(e.target).get("carNames");
    return carNames.split(CAR_NAME_SEPARATOR).map((name) => name.trim());
  }

  generateCars(e) {
    e.preventDefault();
    const carNames = this.getCarNames(e);
    if (this.isValidCarNames(carNames)) {
      const cars = carNames.map((name) => new Car(this.$carContainer, name));
      this.onCarsGenerated(cars);
    }
  }

  focusInput() {
    this.$input.focus();
  }

  addEventHandlers() {
    this.$form.addEventListener("submit", this.generateCars.bind(this));
  }

  disableButton() {
    this.$button.disabled = true;
  }

  reset() {
    this.$input.value = "";
    this.$button.disabled = false;
    this.$carContainer.innerHTML = "";
    this.$input.focus();
  }
}
