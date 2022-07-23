import { Alert, alertError } from "./utils/Alert.js";
import { ROUNDS_INPUT, ROUNDS_SUBMIT_BUTTON } from "./utils/selector.js";
import { ROUNDS_INPUT_ERROR_MESSAGES } from "./utils/errorMessage.js";
import { isFunction, isHTMLFormElement, isPositiveInteger } from "./utils/validator.js";

export class RoundsInput {
  $form;
  $input;
  $button;
  onSetRoundCount;

  constructor($form, { onSetRounds } = {}) {
    if (!isHTMLFormElement($form)) {
      throw new TypeError(`${$form} is not a HTMLFormElement`);
    }
    this.$form = $form;
    this.$input = $form.querySelector(ROUNDS_INPUT);
    this.$button = $form.querySelector(ROUNDS_SUBMIT_BUTTON);

    if (!isFunction(onSetRounds)) {
      throw new TypeError(`${onSetRounds} is not a function`);
    }
    this.onSetRounds = onSetRounds;
    this.addEventHandlers();
  }

  validateRounds(rounds) {
    if (!isPositiveInteger(rounds)) {
      throw new Alert(ROUNDS_INPUT_ERROR_MESSAGES.ROUNDS_IN_NOT_POSITIVE_INTEGER);
    }
  }

  setRounds(e) {
    try {
      e.preventDefault();
      const rounds = +new FormData(e.target).get("rounds");
      this.validateRounds(rounds);
      this.onSetRounds(rounds);
    } catch (error) {
      alertError(error, this.focusInput.bind(this));
    }
  }

  focusInput() {
    this.$input.focus();
  }

  showInput() {
    this.$form.classList.add("visible", true);
  }

  addEventHandlers() {
    this.$form.addEventListener("submit", this.setRounds.bind(this));
  }

  disableButton() {
    this.$button.disabled = true;
  }

  rest() {
    this.$form.classList.remove("visible");
    this.$input.value = "";
    this.$button.disabled = false;
  }
}
