import Component from "../core/Component.js";
import { eventType } from "../constants.js";

export default class CarNameForm extends Component {
  template() {
    return /*html*/ `
    <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
    <p>
      5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
      예시) EAST, WEST, SOUTH, NORTH
    </p>
    <div class="d-flex carName-container">
      <input type="text" class="w-100 mr-2 carName-input" placeholder="자동차 이름" />
      <button type="button" class="btn btn-cyan carName-submitBtn">확인</button>
    </div>`;
  }

  setEvent() {
    this.addEvent("click", ".carName-submitBtn", (e) => {
      e.preventDefault();
      this.submitCarName();
    });

    this.addEvent("keyup", ".carName-container", (e) => {
      if (e.key != eventType.ENTER) return;
      this.submitCarName();
    });
  }

  submitCarName() {
    const { getCarName } = this.$props;

    if (!getCarName(document.querySelector(".carName-input").value)) return;

    document.getElementById("fieldset-carName").disabled = true;
  }
}
