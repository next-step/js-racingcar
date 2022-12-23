import { $ } from "../utils/selector.js";
import {
  checkAllMaxLengthOfStringNode,
  checkAllTypeOfStringNode,
  checkEmptyString,
  removeWordSpacing,
} from "../utils/utils.js";

class RacingController {
  #model;
  constructor(model) {
    this.#model = model;
    this.submit = Object.freeze({
      "submit-car-name-button": () => this.handledSubmitCarNames(),
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
    this.#model.notify(this.#model);
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
    if (Object.hasOwn(this.submit, submitter.id) === false) {
      alert("해당 submitter는 등록되지 않았습니다.");
      return;
    }
    this.submit[submitter.id]();
  }
}

export default RacingController;
