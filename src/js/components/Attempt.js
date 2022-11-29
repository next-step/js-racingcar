import Component from '../core/Component.js';

class Attempt extends Component {
  template() {
    return /*html*/ `
      <form>
        <fieldset>
          <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
          <p>
            5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
            예시) EAST, WEST, SOUTH, NORTH
          </p>
          <div class="d-flex">
            <input type="text" class="w-100 mr-2 car-name-input" placeholder="자동차 이름" />
            <button type="button" class="btn btn-cyan name-submit-button">확인</button>
          </div>
        </fieldset>
        <fieldset>
          <p class="move-explanation">시도할 횟수를 입력해주세요.</p>
          <div class="d-flex">
            <input type="number" class="w-100 mr-2 move-input" placeholder="시도 횟수" />
            <button type="button" class="btn btn-cyan">확인</button>
          </div>
        </fieldset>
      </form>
    `;
  }
}

export default Attempt;
