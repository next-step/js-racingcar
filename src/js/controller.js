import Car from "./model.js";
import {
  showElement,
  dom,
  renderArrowElement,
  removeChildNodes,
  renderWinner,
  renderRemoveProcess,
} from "./view.js";
import { isUpperFour, delay } from "./utils.js";
import { CAR_INPUT_ERR_MESSAGE, TRY_COUNT_ERR_MESSAGE } from "./constants.js";

export class RacingCar {
  #carsElement;
  #tryCount;

  constructor() {
    this.init();
  }

  init() {
    dom.carsNameButton.addEventListener("click", () => {
      this.onClickCarsName();
    });
    dom.tryCountButton.addEventListener("click", () => this.onClickTryCount());
    dom.resetButton.addEventListener("click", () => this.onClickReset());
  }

  wrongCarsName() {    
    this.#carsElement.find((carName) => { 
      if (carName.length > 5 || !carName) return true }
    );
    
    return false
  }

  validateTryCount() {
    if (this.#tryCount && this.#tryCount > 0) return true;
    return false;
  }

  onClickCarsName() {
    this.#carsElement = new FormData(dom.raceForm)
      .get("cars-name-input")
      .split(",");

    if (this.wrongCarsName()) {
      alert(CAR_INPUT_ERR_MESSAGE);
      return;
    }

    this.#carsElement = this.#carsElement.map((car) => new Car(car));
    this.#carsElement.map((car) => car.renderCarElement());

    showElement("inputCarsName");
  }

  onClickTryCount() {
    this.#tryCount = new FormData(dom.raceForm).get("try-count-input");

    if (!this.validateTryCount()) {
      alert(TRY_COUNT_ERR_MESSAGE);
      return;
    }

    showElement("inputTryCount");
    this.startRacing();
  }

  async startRacing() {
    this.#carsElement.map((car) => this.progressRacing(car, this.#tryCount));
  }

  async progressRacing(car, tryCount) {
    for (let i = 0; i < tryCount; i++) {
      await delay(1000);
      if (isUpperFour()) {
        car.progressLength += 1;
        renderArrowElement(car);
      }
    }
    renderRemoveProcess(car);
    renderWinner(this.#carsElement);
  }

  onClickReset() {
    removeChildNodes(dom.raceStatus);
    dom.raceStatus.classList.add("hide");
    dom.tryCount.classList.add("hide");
    dom.raceResultWrapper.classList.add("hide");
    dom.raceForm.reset();
  }
}
