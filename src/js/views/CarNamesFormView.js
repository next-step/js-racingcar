import View from "./@common/View.js";
import { CLASS_NAME, INPUT_NAME } from "../constants/selectors.js";
import { EVENT_NAME } from "../constants/events.js";

class CarNamesFormView extends View {
  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    super.render(`
      <p>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
      </p>
      <form class="${CLASS_NAME.CAR_NAMES_FORM} d-flex">
        <input type="text" class="w-100 mr-2" name="${INPUT_NAME.CAR_NAMES}" placeholder="자동차 이름" />
        <button class="btn btn-cyan">확인</button>
      </form>
    `);
  }

  bindEvents() {
    document
      .querySelector(`.${CLASS_NAME.CAR_NAMES_FORM}`)
      .addEventListener("submit", this.onCarNamesSubmit.bind(this));
  }

  onCarNamesSubmit(event) {
    event.preventDefault();

    const $form = event.target;
    const carNamesString = $form.elements[INPUT_NAME.CAR_NAMES].value;

    this.emit(EVENT_NAME.SUBMIT.CAR_NAMES, { carNamesString });
    $form.reset();
  }
}

export default CarNamesFormView;
