import { $ } from './util.js';
import Component from './Component.js';

export default class NameInput extends Component {
  carNames;

  template() {
    return `
        <form>
          <fieldset id="car-name-container" data-cy="car-name-container">
            <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
            <p>
              5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
              예시) EAST, WEST, SOUTH, NORTH
            </p>
            <div class="d-flex">
              <input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
              <button type="button" class="btn btn-cyan">확인</button>
            </div>
          </fieldset>
        </form>  
    `
  }

  setEvent() {
    const {inputNames} = this.props;

    const $inputCarName = $('#car-name-container input');
    const $submitCarNameBtn = $('#car-name-container button');

    this.addEvent('click', '#car-name-container button', () => {
      const isValid = inputNames($inputCarName.value);
      if (isValid) {
        $inputCarName.disabled = true;
        $submitCarNameBtn.disabled = true;
        return;
      }
      $inputCarName.value = '';  
    })

    this.addEvent('keydown', '#car-name-container input', ({ key }) => {
      if (key !== 'Enter') return;
      const isValid = inputNames($inputCarName.value);
      
      if (isValid) {
        $inputCarName.disabled = true;
        $submitCarNameBtn.disabled = true;
        return;
      }
      $inputCarName.value = '';
    }) 
  }
}
