import { Alert, alertError } from "./utils/Alert.js";
import { ROUND_INPUT_ERROR_MESSAGES } from "./utils/errorMessage.js";
import { ROUND_FIELDSET, ROUND_INPUT } from "./utils/selector.js";
import { isFunction, isHTMLFormElement, isPositiveInteger } from "./utils/validator.js";

export class RoundsInput {
  $form;
  $input;
  onSetRoundCount;

  constructor($form, { onSetRounds } = {}) {
    if (!isHTMLFormElement($form)) {
      throw new TypeError(`${$form} is not a HTMLFormElement`);
    }
    this.$form = $form;
    this.$fieldset = $form.querySelector(ROUND_FIELDSET);
    this.$input = $form.querySelector(ROUND_INPUT);

    if (!isFunction(onSetRounds)) {
      throw new TypeError(`${onSetRounds} is not a function`);
    }
    this.onSetRounds = onSetRounds;
    this.addEventHandlers();
  }

  validateRounds(rounds) {
    if (!isPositiveInteger(rounds)) {
      throw new Alert(ROUND_INPUT_ERROR_MESSAGES.ROUNDS_IN_NOT_POSITIVE_INTEGER);
    }
  }

  setRounds(e) {
    try {
      e.preventDefault();
      const rounds = new FormData(e.target).get("rounds");
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
    this.$fieldset.classList.toggle("visible", true);
  }

  addEventHandlers() {
    this.$form.addEventListener("submit", this.setRounds.bind(this));
  }
}
