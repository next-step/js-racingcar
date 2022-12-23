import Observer from "./observer.js";
import { $, $$ } from "../utils/selector.js";

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
    ); // 값을 변경하는 controller를 전달, View는 모델에 직접 접근하지 않는다.
    this.#controller.model.subscribe(this);
  }

  showCountFieldset() {
    this.$countform.classList.add("active");
    this.setDisabledCarNameFieldset();
  }

  setDisabledCarNameFieldset() {
    this.$carNameInput.setAttribute("disabled", "true");
    this.$submitCarNameButton.setAttribute("disabled", "true");
  }

  update(model) {
    this.showCountFieldset();
    console.log("update", model);
  }
}

export default RacingView;
