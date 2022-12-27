import Observer from "./observer.js";
import { $, $$ } from "../utils/selector.js";
import {
  ACTION_TYPE,
  CONGRATULATORY_MESSAGE,
  DELAY_MILLISECONDS,
} from "../utils/constants.js";
import {
  $FORWARD_ICON_ELEMENT,
  $SPINNER_ELEMENT,
  createCarElement,
} from "../utils/template.js";

class RacingView extends Observer {
  #controller;
  $$cars;
  constructor(controller) {
    super();
    this.#controller = controller;

    this.$$forms = $$("form");
    this.$countform = $("#car-count-setting-form");

    this.$carNameElements = Object.freeze({
      $input: $("#car-name-input"),
      $submitButton: $("#submit-car-name-button"),
    });

    this.$attemptElements = Object.freeze({
      $input: $("#attempt-count-input"),
      $submitButton: $("#submit-attempt-count-button"),
    });

    this.$racingGroundSection = $("#racing-ground-section");
    this.$resultSection = $("#result-section");
    this.$winnerInfo = $("#winner-info");

    this.ACTIONS = Object.freeze({
      [ACTION_TYPE.CAR_NAME]: () => this.showCountFieldset(),
      [ACTION_TYPE.ATTEMPT_COUNT]: async () => {
        await this.startRacing();
        this.showWinner();
      },
    });

    this.$$forms.forEach((form) =>
      form.addEventListener("submit", this.#controller)
    );

    this.#controller.model.subscribe(this);
  }

  createCars() {
    this.setDisabledElements(this.$attemptElements);
    this.$racingGroundSection.classList.add("active");
    const $carElements = this.#controller.model.state.cars.reduce(
      (acc, pre) => {
        acc += createCarElement(pre.name);
        return acc;
      },
      ""
    );

    this.$racingGroundSection.insertAdjacentHTML("afterbegin", $carElements);
    this.$$cars = $$(".car");
  }

  showSpinner() {
    this.$$cars.forEach(($el) =>
      $el.insertAdjacentHTML("beforeend", $SPINNER_ELEMENT)
    );
  }

  hideSpinner() {
    const $$spinnerIcons = $$(".spinner-icon");
    $$spinnerIcons.forEach(($el) => $el.remove());
  }

  showWinner() {
    const { winner } = this.#controller.model.state;

    this.$resultSection.classList.add("active");
    this.$winnerInfo.innerText = `🏆 최종 우승자: ${winner.join(", ")} 🏆`;

    setTimeout(() => {
      alert(CONGRATULATORY_MESSAGE);
    }, DELAY_MILLISECONDS);
  }

  moveToCarsEveryDelayTime(ms) {
    return new Promise((resolve) => {
      let motionCount = 0;
      const { cars, attemptCount } = this.#controller.model.state;

      this.showSpinner();

      const timer = setInterval(() => {
        this.$$cars.forEach(($car, carIndex) => {
          const isForwardCar = cars[carIndex].turnOfMotion[motionCount];

          if (isForwardCar === false) return;

          $car.lastChild.insertAdjacentHTML(
            "beforebegin",
            $FORWARD_ICON_ELEMENT
          );
        });

        motionCount += 1;
        if (motionCount === attemptCount) {
          clearInterval(timer);
          this.hideSpinner();
          resolve();
        }
      }, ms);
    });
  }

  showCountFieldset() {
    this.$countform.classList.add("active");
    this.$attemptElements.$input.focus();
    this.setDisabledElements(this.$carNameElements);
  }

  setDisabledElements($elements) {
    const $selectors = Object.values($elements);
    $selectors.forEach(($selector) => {
      $selector.setAttribute("disabled", "true");
    });
  }

  async startRacing() {
    this.createCars();
    await this.moveToCarsEveryDelayTime(DELAY_MILLISECONDS);
  }

  action(type) {
    this.ACTIONS[type]();
  }
}

export default RacingView;
