import Component from '../lib/component.js';
import store from '../store/index.js';
import el from '../utils/dom.js';
import { $ } from '../utils/utils.js';

export default class CarNamesForm extends Component {
  constructor() {
    super({ store });
  }

  bindEvent() {
    this.$element.addEventListener('submit', (event) => this.onSubmitCarNames(event));
  }

  onSubmitCarNames(event) {
    event.preventDefault();
    store.dispatch('setCarNames', {
      carNames: this.$carNamesInput.value.split(',').map((carName) => carName.trim()),
    });
  }

  setDom() {
    this.$carNamesInput = this.$element.querySelector('.car-name-input');
  }

  render() {
    this.$element = el(`
        <form class="car-names-form" data-testid="carNamesForm">
            <fieldset>
                <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
                <p>
                    5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br/>
                    예시) EAST, WEST, SOUTH, NORTH
                </p>
                <div class="d-flex">
                    <input
                            type="text"
                            class="w-100 mr-2 car-name-input"
                            placeholder="자동차 이름"
                            data-testid="carNamesInput"
                    />
                    <button type="submit" class="btn btn-cyan car-name-submit-btn" data-testid="carNamesSubmitBtn">
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
