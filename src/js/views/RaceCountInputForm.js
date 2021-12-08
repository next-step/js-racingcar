import View from './View.js';
import { INVALID_COUNT } from '../constants/index.js';
import { $ } from '../utils/index.js';

class RaceCountInputForm extends View {
  tag = "[RaceCountInputForm]";

  init() {
    this
      .on('click', this.clickHandler)
      .on('keydown', this.keydownHandler);
  }

  clickHandler = e => {
    if (e.target.type === "button") {
      // console.log(`${this.tag}: clickHandler => ${e.target.valueAsNumber}`);
      if (!this.checkValid(e.target.value)) {
        $("#inputRunCount").value = "";
        $("#inputRunCount").focus();
      }
    }
  }

  keydownHandler = e => {
    if (e.target.type === "number" && e.key === "Enter") {
      // console.log(`${this.tag}: keydownHandler => ${e.target.valueAsNumber}`);
      if (!this.checkValid(e.target.value)) {
        e.target.value = "";
        e.target.focus();
      }
    }
  }

  checkValid(count) {
    // console.log(`${this.tag}: checkValid count => `, count)
    if (!count || count <= 0) {
      this.error(INVALID_COUNT);
      return false;
    }

    this.emit("submit-run-count", { count });
    this.disableField();
    return true;
  }

  disableField() {
    $("#inputRunCount").setAttribute("disabled", true);
    $("#btnRunCount").setAttribute("disabled", true);
  }

  render() {
    /* html */
    return `
    <fieldset>
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input id="inputRunCount" type="number" class="w-100 mr-2" placeholder="시도 횟수" />
        <button id="btnRunCount" type="button" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
    `;
  }

}

customElements.define("race-count-form", RaceCountInputForm);

export default RaceCountInputForm;