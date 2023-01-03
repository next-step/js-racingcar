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
  $carList;
  $$cars;

  constructor(controller) {
    super();
    this.#controller = controller;

    this.$carRacingSettingSection = $("#car-racing-setting-section");
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
    this.$restartButton = $("#restart-button");

    this.ACTIONS = Object.freeze({
      [ACTION_TYPE.CAR_NAME]: () => this.showCountFieldset(),
      [ACTION_TYPE.ATTEMPT_COUNT]: async (state) => {
        await this.startRacing(state);
        this.showWinner(state);
      },
      [ACTION_TYPE.RESET]: () => this.reset(),
    });

    this.$carRacingSettingSection.addEventListener("submit", this.#controller);
    this.$restartButton.addEventListener("click", this.#controller);

    this.#controller.model.subscribe(this);
  }

  renderCarList() {
    const $carList = document.createElement("ul");
    $carList.id = "car-list";

    this.$racingGroundSection.appendChild($carList);
    this.$carList = $("#car-list");
  }

  createCars(cars) {
    this.renderCarList();
    this.showRacingSection();

    const $carElements = cars.reduce((acc, pre) => {
      acc += createCarElement(pre.name);
      return acc;
    }, "");

    this.$carList.insertAdjacentHTML("afterbegin", $carElements);
    this.$$cars = $$(".car");
  }

  moveToCarsEveryDelayTime({ ms, cars, attemptCount }) {
    return new Promise((resolve) => {
      let motionCount = 0;

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

  showRacingSection() {
    this.setDisabledElements(this.$attemptElements);
    this.$racingGroundSection.classList.add("active");
  }

  showWinner({ winner }) {
    this.$resultSection.classList.add("active");
    this.$winnerInfo.innerText = `🏆 최종 우승자: ${winner.join(", ")} 🏆`;

    setTimeout(() => {
      alert(CONGRATULATORY_MESSAGE);
    }, DELAY_MILLISECONDS * 2);
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

  setDisabledElements($elements, status = true) {
    const $selectors = Object.values($elements);
    $selectors.forEach(($selector) => {
      const handler = () =>
        status
          ? $selector.setAttribute("disabled", "true")
          : $selector.removeAttribute("disabled", "true");

      handler();
    });
  }

  async startRacing({ cars, attemptCount }) {
    this.createCars(cars);
    await this.moveToCarsEveryDelayTime({
      ms: DELAY_MILLISECONDS,
      cars,
      attemptCount,
    });
  }

  reset() {
    this.$carNameElements.$input.value = "";
    this.$attemptElements.$input.value = "";
    this.$winnerInfo.innerText = "";

    this.$countform.classList.remove("active");
    this.$racingGroundSection.classList.remove("active");
    this.$resultSection.classList.remove("active");

    this.$carList.remove();

    this.setDisabledElements(this.$carNameElements, false);
    this.setDisabledElements(this.$attemptElements, false);
  }

  action(type, state) {
    this.ACTIONS[type](state);
  }
}

export default RacingView;
