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
    this.$restartButton = $("#restart-button");

    this.ACTIONS = Object.freeze({
      [ACTION_TYPE.CAR_NAME]: () => this.showCountFieldset(),
      [ACTION_TYPE.ATTEMPT_COUNT]: async () => {
        await this.startRacing();
        this.showWinner();
      },
      [ACTION_TYPE.RESET]: () => this.reset(),
    });

    this.$$forms.forEach((form) =>
      form.addEventListener("submit", this.#controller)
    );

    this.$restartButton.addEventListener("click", this.#controller);

    this.#controller.model.subscribe(this);
  }

  renderCarList() {
    const $carList = document.createElement("ul");
    $carList.id = "car-list";

    this.$racingGroundSection.appendChild($carList);
    this.$carList = $("#car-list");
  }

  createCars() {
    this.renderCarList();
    this.showRacingSection();

    const $carElements = this.#controller.model.state.cars.reduce(
      (acc, pre) => {
        acc += createCarElement(pre.name);
        return acc;
      },
      ""
    );

    this.$carList.insertAdjacentHTML("afterbegin", $carElements);
    this.$$cars = $$(".car");
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

  showRacingSection() {
    this.setDisabledElements(this.$attemptElements);
    this.$racingGroundSection.classList.add("active");
  }

  showWinner() {
    const { winner } = this.#controller.model.state;

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

  async startRacing() {
    this.createCars();
    await this.moveToCarsEveryDelayTime(DELAY_MILLISECONDS);
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

  action(type) {
    this.ACTIONS[type]();
  }
}

export default RacingView;
