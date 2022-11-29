import { CLICK_EVENT_MAP } from '../constants.js';
import Component from '../core/Component.js';
class TrialCount extends Component {
  template() {
    return /*html*/ `
      <p class="move-explanation">시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input type="number" class="w-100 mr-2 move-input" placeholder="시도 횟수" />
        <button type="button" class="btn btn-cyan">확인</button>
      </div>
    `;
  }
}

class Attempt extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
    this.state = {
      isVisibleTrial: false,
    };
  }

  template() {
    return /*html*/ `
      <form class="attempt-wrapper">
        <fieldset>
          <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
          <p>
            5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
            예시) EAST, WEST, SOUTH, NORTH
          </p>
          <div class="d-flex">
            <input type="text" class="w-100 mr-2 car-name-input" placeholder="자동차 이름" />
            <button type="button" class="btn btn-cyan name-submit-button" data-id="submit-carname">확인</button>
          </div>
        </fieldset>
        <fieldset class="trial-count-wrapper">
         <!-- <p class="move-explanation">시도할 횟수를 입력해주세요.</p>
          <div class="d-flex">
            <input type="number" class="w-100 mr-2 move-input" placeholder="시도 횟수" />
            <button type="button" class="btn btn-cyan">확인</button>
          </div> -->
        </fieldset>
      </form>
    `;
  }

  // setState(nextState) {
  //   this.state = nextState;
  // }

  onSubmitCarname(event) {
    this.setState({ ...this.state, isVisibleTrial: true });
    console.log(this.state);
    // store.setState({ isVisibleTrial: true });
  }

  render() {
    const { $target } = this;

    // const { isVisibleTrial } = store.state;
    const { isVisibleTrial } = this.state;
    console.log('in render', isVisibleTrial);
    if (isVisibleTrial) {
      new TrialCount({
        $target: $target.querySelector('.trial-count-wrapper'),
      });
    }

    if (!isVisibleTrial) {
      $target.querySelector('.trial-count-wrapper').innerHTML = '';
    }
  }

  addEventListener() {
    CLICK_EVENT_MAP.set('submit-carname', this.onSubmitCarname.bind(this));
  }
}

export default Attempt;
