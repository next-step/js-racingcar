import { NotableError, noticeError } from "./utils/NotableError.js";
import { ROUNDS_INPUT, ROUNDS_SUBMIT_BUTTON } from "./utils/selector.js";
import { ROUNDS_INPUT_ERROR_MESSAGES } from "./utils/errorMessage.js";
import { isFunction, isHTMLFormElement, isPositiveInteger } from "./utils/validator.js";
import { MAX_ROUNDS } from "./utils/constant.js";

export class RoundsInput {
  $form;
  $input;
  $button;
  onSetRoundCount;

  constructor($form, { onSetRounds } = {}) {
    if (!isHTMLFormElement($form)) {
      throw new TypeError(`${$form} is not a HTMLFormElement`);
    }

    if (!isFunction(onSetRounds)) {
      throw new TypeError(`${onSetRounds} is not a function`);
    }

    this.$form = $form;
    this.$input = $form.querySelector(ROUNDS_INPUT);
    this.$button = $form.querySelector(ROUNDS_SUBMIT_BUTTON);

    this.onSetRounds = onSetRounds;
    this.addEventHandlers();
  }

  isValidRounds(rounds) {
    try {
      if (!isPositiveInteger(rounds)) {
        throw new NotableError(ROUNDS_INPUT_ERROR_MESSAGES.ROUNDS_IN_NOT_POSITIVE_INTEGER);
      }

      if (rounds > MAX_ROUNDS) {
        throw new NotableError(ROUNDS_INPUT_ERROR_MESSAGES.ROUNDS_OVER_MAX_ROUNDS);
      }

      return true;
    } catch (error) {
      noticeError(error, this.focusInput.bind(this));
      return false;
    }
  }

  setRounds(event) {
    event.preventDefault();
    const rounds = Number(new FormData(event.target).get("rounds"));
    if (this.isValidRounds(rounds)) {
      this.onSetRounds(rounds);
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
