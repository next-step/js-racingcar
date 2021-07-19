import { $ } from './util.js';
import Component from './Component.js';

export default class AttemptNumberInput extends Component {
  template() {
    return `
      <fieldset id="attempt-number-container" data-cy="attempt-number-container">
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
          <button type="button" class="btn btn-cyan">확인</button>
        </div>
      </fieldset>
    `
  }

  render() {
    this.$target.insertAdjacentHTML('afterend', this.template());
  }

  setEvent() {
  }
}