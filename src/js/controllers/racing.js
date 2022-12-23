import { $ } from "../utils/selector.js";
import {
  checkAllMaxLengthOfStringNode,
  checkAllTypeOfStringNode,
  checkEmptyString,
  removeWordSpacing,
} from "../utils/utils.js";
import { ACTION_TYPE, ERROR_MESSAGES } from "../utils/constants.js";

class RacingController {
  #model;
  constructor(model) {
    this.#model = model;
    this.SUBMIT = Object.freeze({
      "submit-car-name-button": () => this.handledSubmitCarNames(),
      "submit-attempt-count-button": () => this.handledSubmitAttemptCount(),
    });
  }

  get model() {
    return this.#model;
  }
  handleEvent(e) {
    e.preventDefault();
    switch (e.type) {
      case "submit":
        this.submitHandler(e.submitter);
        break;
      default:
        console.log(e.target);
    }
  }

  handledSubmitCarNames() {
    const $nameInput = $("#car-name-input");
    const carNames = $nameInput.value
      .split(",")
      .filter((name) => name !== "")
      .map((name) => removeWordSpacing(name));

    if (this.isValidTobeSubmittedCarNames($nameInput, carNames) === false)
      return;

    this.#model.state.carNames = carNames;
    this.#model.dispatch(ACTION_TYPE.CAR_NAME);
  }

  handledSubmitAttemptCount() {
    const $countInput = $("#attempt-count-input");
    const count = Number($countInput.value);

    if (count === 0) {
      alert(ERROR_MESSAGES.NOT_ALLOW_COUNT);
      return;
    }

    this.#model.state.tryCount = count;
    // if (this.isValidTobeSubmittedCount($countInput, count) === false) return;
    this.#model.dispatch(ACTION_TYPE.ATTEMPT_COUNT);
  }

  isValidTobeSubmittedCarNames($nameInput, names) {
    try {
      checkEmptyString($nameInput.value);
      checkAllMaxLengthOfStringNode(names, 5);
      checkAllTypeOfStringNode(names, "language");
      return true;
    } catch (err) {
      alert(err.message);
      return false;
    }
  }
  submitHandler(submitter) {
    if (Object.hasOwn(this.SUBMIT, submitter.id) === false) {
      alert("해당 submitter는 등록되지 않았습니다.");
      return;
    }
    this.SUBMIT[submitter.id]();
  }
}

export default RacingController;
