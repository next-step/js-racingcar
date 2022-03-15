import { $ } from '../util/dom.js';
import View from './View.js';

export default class TryCountFormSection extends View {
  #template = /* html */ `
    <fieldset>
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input id="tryCount" name="tryCount" type="number" min="1" class="w-100 mr-2" placeholder="시도 횟수" required />
        <button type="submit" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
  `;
  constructor(el) {
    super(el);
    this.render();
    this.bindEvents();
  }

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('beforeend', this.#template);
    this.$tryCount = $('#tryCount');
  }

  init() {
    this.setDisableButton(false);
    this.$tryCount.value = '';
  }

  focus() {
    this.$tryCount.focus();
  }

  bindEvents() {
    this.$target.addEventListener('submit', (e) => {
      e.preventDefault();
      this.emit('@submitTryCount', { data: this.$tryCount.value });
    });
  }

  setDisableButton(flag) {
    [$('input', this.$target), $('button', this.$target)].forEach((el) => {
      el.disabled = flag;
    });
  }
}
