import Component from '../lib/component.js';
import store from '../store/index.js';
import el from '../utils/dom.js';
import { $ } from '../utils/utils.js';
import { ACTIONS } from '../constants.js';

export default class TryCountsForm extends Component {
  constructor() {
    super({ store });
  }

  onSubmitTryCountForm(event) {
    event.preventDefault();

    store.dispatch(ACTIONS.SET_TRY_COUNTS, {
      tryCountsString: this.$tryCountsInput.value,
    });
    store.dispatch(ACTIONS.SET_PROGRESS_MATRIX);
    store.dispatch(ACTIONS.SET_WINNERS);
  }

  setDom() {
    this.$tryCountsInput = this.$element.querySelector('.try-counts-input');
  }

  bindEvent() {
    this.$element.addEventListener('submit', (event) => this.onSubmitTryCountForm(event));
  }

  render() {
    this.$element = el(`
        <form class="try-counts-form" style="display: none" data-testid="tryCountsForm">
            <fieldset>
                <p>시도할 횟수를 입력해주세요.</p>
                <div class="d-flex">
                    <input
                            type="number"
                            class="w-100 mr-2 try-counts-input"
                            placeholder="시도 횟수"
                            data-testid="tryCountsInput"
                    />
                    <button type="submit" class="btn btn-cyan try-count-submit-btn" data-testid="tryCountsSubmitBtn">
                        확인
                    </button>
                </div>
            </fieldset>
        </form>
    `);

    this.setDom();
    this.bindEvent();

    $('.form-section').appendChild(this.$element);
  }
}
