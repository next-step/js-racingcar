import Car from "./model.js";
import { setStyle, inputField } from "./view.js";
import { CAR_INPUT_ERR_MESSAGE, TRY_COUNT_ERR_MESSAGE } from "./constants.js";

export class RacingCar {
  #carsElement;
  #tryCount;

  constructor() {
    this.init();
  }

  init() {
    inputField.carsNameButton.addEventListener("click", () => {
      this.onClickCarsName();
    });
    inputField.tryCountButton.addEventListener("click", () =>
      this.onClickTryCount()
    );
  }

  validateCarsName() {
    let isCorrectInput = true;

    if (this.#carsElement.length > 5) isCorrectInput = false;

    this.#carsElement.find((carName) => {
      if (carName.length > 5 || !carName) isCorrectInput = false;
    });

    return isCorrectInput;
  }

  validateTryCount() {
    if (this.#tryCount && this.#tryCount > 0) return true;
    return false;
  }

  onClickCarsName() {
    this.#carsElement = new FormData(inputField.raceForm)
      .get("cars-name-input")
      .split(",");

    if (!this.validateCarsName()) {
      alert(CAR_INPUT_ERR_MESSAGE);
      return;
    }

    this.#carsElement = this.#carsElement.map((car) => new Car(car));
    this.#carsElement.map((car) => car.renderCarElement());

    setStyle("inputCarsName");
  }

  onClickTryCount() {
    this.#tryCount = new FormData(inputField.raceForm).get("try-count-input");

    if (!this.validateTryCount()) {
      alert(TRY_COUNT_ERR_MESSAGE);
      return;
    }

    setStyle("inputTryCount");
    this.startRacing();
  }

  startRacing() {
    this.#carsElement.map((car) => car.progressRacing(this.#tryCount));
  }
}
