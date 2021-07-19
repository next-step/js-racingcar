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
    this.$target.insertAdjacentHTML('beforeend',this.template());
  }

  setEvent() {
    const {inputCount} = this.props
    const $inputCount = $('#attempt-number-container input');
    const $submitCountBtn = $('#attempt-number-container button');

    this.addEvent('click', '#attempt-number-container button', () => {
      inputCount(Number($inputCount.value));
      $inputCount.disabled = true;
      $submitCountBtn.disabled = true;
    })

    this.addEvent('keydown', '#attempt-number-container input', ({ key }) => {
      if (key !== 'Enter') return;
      const isValid = inputCount(Number($inputCount.value));
      
      if (isValid) {
        $inputCount.disabled = true;
        $submitCountBtn.disabled = true;
        return;
      }
      $inputCount.value = '';
    })
  }
}