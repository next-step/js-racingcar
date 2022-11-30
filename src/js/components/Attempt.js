import { EVENT_MAP } from '../constants.js';
import Component from '../core/Component.js';
import { store } from '../store/index.js';
import { splitingCarNames, validateCarNames } from '../utils/index.js';
import Trial from './Trial.js';

class Attempt extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });

    this.state = {
      isVisibleTrial: false,
      carNames: null,
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
            <input type="text" class="w-100 mr-2 car-name-input" placeholder="자동차 이름" data-id="car-name-input"/>
            <button type="button" class="btn btn-cyan name-submit-button" data-id="submit-carname">확인</button>
          </div>
        </fieldset>
        <fieldset class="trial-count-wrapper">
        </fieldset>
      </form>
    `;
  }

  onSubmitCarname(event) {
    event.preventDefault();
    if (!validateCarNames(splitingCarNames(this.state.carNames))) {
      alert(
        '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
      );
      return;
    }

    this.setState({ isVisibleTrial: true });
    store.setState({ carNames: this.state.carNames });
  }

  onTypeCarNames(event) {
    this.setState({ carNames: event.target.value });
  }

  render() {
    const { $target, state } = this;
    const { isVisibleTrial, carNames } = state;
    const $trialWrapper = $target.querySelector('.trial-count-wrapper');

    if (isVisibleTrial) {
      new Trial({
        $target: $trialWrapper,
      });
    }

    if (!isVisibleTrial && $trialWrapper.innerHTML.length) {
      $trialWrapper.innerHTML = '';
    }

    //*TODO: 이건 아니야.. store의 state가 사용되는 곳만 리렌더하도록 꼭 변경 필요
    $target
      .querySelector('[data-id=car-name-input]')
      .setAttribute('value', carNames || store.state.carNames);
    if (!isVisibleTrial)
      $target.querySelector('[data-id=car-name-input]').focus();
    if (isVisibleTrial) {
      $target
        .querySelector('[data-id=submit-carname]')
        .setAttribute('disabled', '');
    }
  }

  addEventListener() {
    EVENT_MAP.CLICK.set('submit-carname', this.onSubmitCarname.bind(this));
    EVENT_MAP.KEY_UP.set('car-name-input', this.onTypeCarNames.bind(this));
    EVENT_MAP.SUBMIT.set('submit-carname', this.onSubmitCarname.bind(this));
  }
}

export default Attempt;
