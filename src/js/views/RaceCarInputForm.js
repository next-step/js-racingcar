import View from './View.js';
import { INVALID_NAME_LENGTH } from '../constants/index.js';
import { $ } from '../utils/index.js';

class RaceCarInputForm extends View {
  tag = "[RaceCarInputForm]";

  init() {
    this
      .on('click', this.clickHandler)
      .on('keydown', this.keydownHandler);
  }

  clickHandler = e => {
    if (e.target.type === "button") {
      // console.log(`${this.tag}: clickHandler => ${e.target.value}`);
      if (!this.checkValid(e.target.value)) {
        $("#inputCarNames").value = "";
        $("#inputCarNames").focus();
      }
    }
  }

  keydownHandler = e => {
    if (e.target.type === "text" && e.key === "Enter") {
      // console.log(`${this.tag}: keydownHandler => ${e.target.value}`);
      if (!this.checkValid(e.target.value)) {
        e.target.value = "";
        e.target.focus();
      }
    }
  }

  checkValid(text) {
    if (!text || text.trim("") === "") {
      this.error(INVALID_NAME_LENGTH);
      return false;
    }
      
    const cars = text.split(',');

    if (cars.every(car => car.length >= 1 && car.length <= 5 && !!car.trim(""))) {
      this.emit("submit-car-names", { cars: cars.map(v => v.trim("")) });
      this.disableField();
      return true;
    } else {
      this.error(INVALID_NAME_LENGTH);
      return false;
    }
  }

  disableField() {
    $("#inputCarNames").setAttribute("disabled", true);
    $("#btnCarNames").setAttribute("disabled", true);
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