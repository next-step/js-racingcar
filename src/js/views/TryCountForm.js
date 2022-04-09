import { DOM } from '../constants.js';
import { $ } from '../utils/dom.js';

class TryCountFormView {
  constructor(target) {
    this.$target = target;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
    this.focusTryCountInput();
  }

  mounted() {
    this.$tryCountInput = $(`#${DOM.TRY_COUNT_INPUT_ID}`);
  }

  focusTryCountInput() {
    this.$tryCountInput.focus();
  }

  reset() {
    this.$target.innerHTML = null;
  }

  template() {
    return String.raw`
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input
          id="${DOM.TRY_COUNT_INPUT_ID}"
          type="number"
          class="w-100 mr-2"
          placeholder="시도 횟수"
        />
        <button id="${DOM.TRY_COUNT_SUBMIT_BUTTON_ID}" type="submit" class="btn btn-cyan">
          확인
        </button>
      </div>
    `;
  }
}

export default TryCountFormView;
