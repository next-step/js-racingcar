import Component from '../lib/component.js';
import store from '../store/index.js';
import el from '../utils/dom.js';
import { $ } from '../utils/utils.js';

export default class CarNamesForm extends Component {
  constructor() {
    super({ store });
    this.$carNamesForm = el(CarNamesForm.#template);
    this.$carNamesInput = this.$carNamesForm.querySelector('.car-name-input');

    this.$carNamesForm.addEventListener('submit', (event) =>
      this.onSubmitCarNames(event)
    );
  }

  onSubmitCarNames(event) {
    event.preventDefault();
    store.dispatch('setCarNames', {
      carNames: this.$carNamesInput.value.split(',')
    });
  }

  render() {
    $('#app section').insertAdjacentElement('afterbegin', this.$carNamesForm);
  }

  static #template = `
        <form>
          <fieldset>
            <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
            <p>
              5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
              예시) EAST, WEST, SOUTH, NORTH
            </p>
            <div class="d-flex">
              <input
                type="text"
                class="w-100 mr-2 car-name-input"
                placeholder="자동차 이름"
              />
              <button type="button" class="btn btn-cyan car-name-submit-btn">
                확인
              </button>
            </div>
          </fieldset>
        </form>
`;
}
