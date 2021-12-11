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

  clickHandler = ({ target }) => {
    if (target.type !== "button") return;
    this.runAfterValidation($("#inputRunCount"));
  }

  keydownHandler = ({ key, target }) => {
    if (target.type !== "number" || key !== "Enter") return;
    this.runAfterValidation(target);
  }
  
  runAfterValidation(target) {
    if (!this.isValidCount(target.value)) {
      this.error(INVALID_COUNT);
      target.value = "";
      target.focus();
      return;
    }
    
    this.emit("submit-run-count", { count: target.value });

    $("#inputRunCount").setAttribute("disabled", true);
    $("#btnRunCount").setAttribute("disabled", true);
  }

  isValidCount(count) {
    if (!count || count <= 0) return false;
    return true;
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

  static get observedAttributes(){
    return ['class'];
  }

  attributeChangedCallback(attName, oldValue, newValue){
    if (attName === "class" && newValue !== 'hide') {
      $("#inputRunCount").focus();
    }
  }
}

customElements.define("race-count-form", RaceCountInputForm);

export default RaceCountInputForm;
