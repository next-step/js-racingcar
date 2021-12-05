import { $ } from '../util/dom.js';
import View from './View.js';

export default class CarNameFormSection extends View {
  #template = /* html */ `
    <fieldset>
      <div class="d-flex">
        <input id="carNames" name="carNames" type="text" class="w-100 mr-2" placeholder="자동차 이름" required />
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
    this.$carNames = $('#carNames');
  }

  init() {
    this.toggleDisableButton(false);
    this.$carNames.value = '';
  }

  focus() {
    this.$carNames.focus();
  }

  bindEvents() {
    this.$target.addEventListener('submit', (e) => {
      e.preventDefault();
      this.emit('@submitCarNames', { data: this.$carNames.value });
    });
  }

  setDisableButton(flag) {
    [$('input', this.$target), $('button', this.$target)].forEach((el) => {
      el.disabled = flag;
    });
  }
}
