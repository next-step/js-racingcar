import View from './View.js';
import { INVALID_NAME_LENGTH, CAR_NAME } from '../constants/index.js';
import { $ } from '../utils/index.js';

class RaceCarInputForm extends View {
  tag = "[RaceCarInputForm]";

  init() {
    this
      .on('click', this.clickHandler)
      .on('keydown', this.keydownHandler);
  }

  clickHandler = ({ target }) => {
    if (target.type !== "button") return;
    this.runAfterValidation($("#inputCarNames"));
  }

  keydownHandler = ({ key, target }) => {
    if (target.type !== "text" || key !== "Enter") return;
    this.runAfterValidation(target);
  }

  runAfterValidation(target) {
    if (!this.isValidCarName(target.value)) {
      this.error(INVALID_NAME_LENGTH);
      target.focus();
      return;
    }
    
    this.emit("submit-car-names", { cars: this.splittedText(target.value) });

    $("#inputCarNames").setAttribute("disabled", true);
    $("#btnCarNames").setAttribute("disabled", true);
  }

  isValidCarName(text) {
    if (!text || text.trim("") === "") return false;
      
    return this.splittedText(text)
      .every(car => car.length >= CAR_NAME.MIN_LENGTH && car.length <= CAR_NAME.MAX_LENGTH && !!car.trim(""));
  }

  splittedText(text) {
    return text.split(',').map(v => v.trim(""));
  }

  render() {
    /* html */
    return `
    <fieldset>
      <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
      <p>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
      </p>
      <div class="d-flex">
        <input id="inputCarNames" type="text" class="w-100 mr-2" placeholder="자동차 이름" />
        <button id="btnCarNames" type="button" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
  `;
  }
}

customElements.define("car-input-form", RaceCarInputForm);

export default RaceCarInputForm;
