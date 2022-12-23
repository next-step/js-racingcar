import Observer from "./observer.js";
import { $, $$ } from "../utils/selector.js";
import { ACTION_TYPE } from "../utils/constants.js";

class RacingView extends Observer {
  #controller;
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

    this.ACTIONS = Object.freeze({
      [ACTION_TYPE.CAR_NAME]: () => this.showCountFieldset(),
      [ACTION_TYPE.ATTEMPT_COUNT]: (model) => this.createCar(model),
    });

    this.$$forms.forEach((form) =>
      form.addEventListener("submit", this.#controller)
    );

    this.#controller.model.subscribe(this);
  }

  createCar() {
    console.log("createCar", this.#controller.model.state);

    this.setDisabledElements(this.$attemptElements);
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

  action(type) {
    this.ACTIONS[type]();
  }
}

export default RacingView;
