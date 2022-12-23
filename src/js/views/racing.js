import Observer from "./observer.js";
import { $, $$ } from "../utils/selector.js";
import { ACTION_TYPE } from "../utils/constants.js";

class RacingView extends Observer {
  #controller;
  constructor(controller) {
    super();
    this.#controller = controller;
    this.$$forms = $$("form");
    this.$nameform = $("#car-name-setting-form");
    this.$countform = $("#car-count-setting-form");
    this.$carNameInput = $("#car-name-input");
    this.$submitCarNameButton = $("#submit-car-name-button");
    this.$submitAttemptButton = $("#submit-attempt-count-button");
    this.$$forms.forEach((form) =>
      form.addEventListener("submit", this.#controller)
    );
    this.ACTIONS = Object.freeze({
      [ACTION_TYPE.CAR_NAME]: () => this.showCountFieldset(),
      [ACTION_TYPE.ATTEMPT_COUNT]: (model) => this.createCar(model),
    });

    this.#controller.model.subscribe(this);
  }

  createCar() {
    console.log("createCar", this.#controller.model.state);
  }

  showCountFieldset() {
    this.$countform.classList.add("active");
    this.setDisabledCarNameFieldset();
  }

  setDisabledCarNameFieldset() {
    this.$carNameInput.setAttribute("disabled", "true");
    this.$submitCarNameButton.setAttribute("disabled", "true");
  }

  action(type) {
    this.ACTIONS[type]();
  }
}

export default RacingView;
