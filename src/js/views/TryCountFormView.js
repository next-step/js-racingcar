import View from "./@common/View.js";
import { CLASS_NAME, INPUT_NAME } from "../constants/selectors.js";
import { EVENT_NAME } from "../constants/events.js";

class TryCountFormView extends View {
  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    super.render(`
      <p>시도할 횟수를 입력해주세요.</p>
      <form class="${CLASS_NAME.TRY_COUNT_FORM} d-flex">
        <input type="number" class="w-100 mr-2" name="${INPUT_NAME.TRY_COUNT}" placeholder="시도 횟수" min="0" />
        <button class="btn btn-cyan">확인</button>
      </form>
    `);
  }

  bindEvents() {
    document
      .querySelector(`.${CLASS_NAME.TRY_COUNT_FORM}`)
      .addEventListener("submit", this.onTryCountSubmit.bind(this));
    document
      .querySelector(`.${CLASS_NAME.TRY_COUNT_FORM}`)
      .addEventListener("keydown", this.onTryCountKeydown.bind(this));
  }

  onTryCountSubmit(event) {
    event.preventDefault();

    const $form = event.target;
    const tryCount = $form.elements[INPUT_NAME.TRY_COUNT].value;

    this.emit(EVENT_NAME.SUBMIT.TRY_COUNT, { tryCount });
    $form.reset();
  }

  onTryCountKeydown(event) {
    if (/[.-]/.test(event.key)) {
      event.preventDefault();
    }
  }
}

export default TryCountFormView;
