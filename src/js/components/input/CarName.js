import Component from "../../core/Component.js";
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
}
