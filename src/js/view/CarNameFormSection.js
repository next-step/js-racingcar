import { $ } from '../util/dom.js';
import View from './View.js';

export default class CarNameFormSection extends View {
  #template = /* html */ `
    <fieldset>
      <div class="d-flex">
        <input id="carName" name="carName" type="text" class="w-100 mr-2" placeholder="자동차 이름" required />
        <button type="submit" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
  `;
  constructor(el) {
    super(el);
    this.render();
  }

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('beforeend', this.#template);
  }

  init() {
    $('#carName').value = '';
  }
}
