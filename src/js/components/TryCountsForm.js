import Component from '../lib/component.js';
import store from '../store/index.js';
import el from '../utils/dom.js';
import { $ } from '../utils/utils.js';

export default class TryCountsForm extends Component {
  constructor() {
    super({ store });
    this.$tryCountsForm = el(TryCountsForm.#template);
    this.$tryCountsInput =
      this.$tryCountsForm.querySelector('.try-counts-input');

    this.bindEvent();
  }

  bindEvent() {
    this.$tryCountsForm.addEventListener('submit', (event) =>
      this.onSubmitTryCountForm(event)
    );
  }

  onSubmitTryCountForm(event) {
    event.preventDefault();
    store.dispatch('setTryCounts', {
      tryCountsString: this.$tryCountsInput.value
    });
    store.dispatch('setProcessMatrix');
  }

  render() {
    $('#app section').insertAdjacentElement('beforeend', this.$tryCountsForm);
  }

  static #template = `
        <form>
          <fieldset>
            <p>시도할 횟수를 입력해주세요.</p>
            <div class="d-flex">
              <input
                type="number"
                class="w-100 mr-2 try-counts-input"
                placeholder="시도 횟수"
              />
              <button type="submit" class="btn btn-cyan try-counts-submit-btn">
                확인
              </button>
            </div>
          </fieldset>
        </form>
`;
}
