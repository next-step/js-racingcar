import Component from "../../core/Component.js";
import { _ } from "../../util/dom.js";
import { MESSAGE } from "../../util/constant.js";
export default class CarName extends Component {
  selectPropsToUse() {
    this.selfProps = {};
  }
  getTemplate() {
    return `
    <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
    <p>5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
    </p>
    <div class="d-flex" id="carNameBox">
        <input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
        <button type="button" class="btn btn-cyan">확인</button>
    </div>
   `;
  }
  mountComponents() {
    // createChildComponent 함수에 생성자, targetSelector, getPropsFunction을 인자로 전달해서 실행하세요.
  }
  componentDidMount() {}
  setEventDelegation() {
    this.addEvent("click", "#carNameBox>button", (target) => {
      const $input = _.$("input", this.$target);
      const cars = $input.value.split(",");
      const isValid = this.validateInput(cars);
      if (isValid) {
        console.log("valid");
      } else {
        console.log("not Valid");
      }
    });
  }
  validateInput(input) {
    console.log("input :", input);
    for (const str of input) {
      if (this.isBlank(str)) {
        alert(MESSAGE.BLANK_CARNAME_INPUT);
        return false;
      }
      if (this.isOutOfRange(str)) {
        console.log(str);
        alert(MESSAGE.INVALID_CARNAME_LENGTH);
        return false;
      }
    }

    return true;
  }
  isBlank(str) {
    return str.replace(/^\s+|\s+$/g, "") === "";
  }
  isOutOfRange(str) {
    return str.length < 1 || str.length > 5;
  }
}
