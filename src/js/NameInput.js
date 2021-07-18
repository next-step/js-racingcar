import { $ } from './util.js';
import Component from './Component.js';
import AttemptNumberInput from './AttemptNumberInput.js';
import isValidName from './validation.js';
import INVALID_NAME_LENGTH_ERROR from './message.js';

export default class NameInput extends Component {
  template() {
    return `
      <section class="d-flex justify-center mt-5">
        <form>
          <fieldset id="car-name-container">
            <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
            <p>
              5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
              예시) EAST, WEST, SOUTH, NORTH
            </p>
            <div class="d-flex">
              <input id="input-cars-name" type="text" class="w-100 mr-2" placeholder="자동차 이름" />
              <button id="submit-cars-name" type="button" class="btn btn-cyan">확인</button>
            </div>
          </fieldset>
        </form>
      </section>
    `
  }

  setEvent() {
    const $submitCarNameBtn = $('#submit-cars-name');
    const $inputCarName = $('#input-cars-name');

    $submitCarNameBtn.addEventListener('click', () => {
      const inputNames = $inputCarName.value
                          .split(',')
                          .map(name => name.trim());

      if (!isValidName(inputNames)) {
        alert(INVALID_NAME_LENGTH_ERROR);
        $inputCarName.value = '';
        return;  
      }

      $inputCarName.disabled = true;
      $submitCarNameBtn.disabled = true;
      new AttemptNumberInput('#car-name-container');
    });

  }
}

new NameInput('#app');