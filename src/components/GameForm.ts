import Component from "../core/Component";

export default class GameForm extends Component {
  constructor($target: Element | null, props?: Object) {
    super($target, props);
  }

  onClickCarBtn() {}

  onClickTryBtn() {}

  componentInit() {
    this.$target.addEventListener("click", (e) => {
      const $eventTarget = e.target as HTMLElement;
      if ($eventTarget.matches(".btn-car")) {
        console.log($eventTarget);
      } else if ($eventTarget.matches(".btn-try")) {
        console.log($eventTarget);
      }
    });
  }

  getInnerHTML() {
    return `
        <fieldset>
          <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
          <p>
            5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
            예시) EAST, WEST, SOUTH, NORTH
          </p>
          <div class="d-flex">
            <input type="text" class="w-100 mr-2 input-car" placeholder="자동차 이름" />
            <button type="button" class="btn btn-cyan btn-car">확인</button>
          </div>
        </fieldset>
        <fieldset>
          <p>시도할 횟수를 입력해주세요.</p>
          <div class="d-flex">
            <input type="number" class="w-100 mr-2 input-try" placeholder="시도 횟수" />
            <button type="button" class="btn btn-cyan btn-try">확인</button>
          </div>
        </fieldset>
    `;
  }
}
