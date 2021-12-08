import Component from "../lib/component.js";
import store from '../store/index.js';
import el from "../utils/dom.js";
import {$} from "../utils/utils.js";

export default class TryCountsForm extends Component {
  constructor() {
    super({store});
    this.$tryCountForm = el(TryCountsForm.#template);

    this.bindEvent();
  }

  bindEvent() {
    this.$tryCountForm.addEventListener('submit', (event) => this.onSubmitTryCountForm(event));
  }

  onSubmitTryCountForm(event) {
    event.preventDefault();
    console.log('onSubmitTryCountForm');
  }

  render() {
    $('#app section').insertAdjacentElement('beforeend', this.$tryCountForm);
  }

  static #template = `
        <form>
          <fieldset>
            <p>시도할 횟수를 입력해주세요.</p>
            <div class="d-flex">
              <input
                type="number"
                class="w-100 mr-2 try-count-input"
                placeholder="시도 횟수"
              />
              <button type="submit" class="btn btn-cyan try-count-submit-btn">
                확인
              </button>
            </div>
          </fieldset>
        </form>
`
};