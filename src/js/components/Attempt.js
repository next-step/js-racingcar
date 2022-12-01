import { EVENT_MAP } from '../constants.js';
import Component from '../core/Component.js';
import { store } from '../store/index.js';
import {
  makeDefaultRacingMap,
  splitingCarNames,
  validateCarNames,
} from '../utils/index.js';
import Trial from './Trial.js';

class Attempt extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
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
    const { carNames } = store.state;
    const splitedCarNames = splitingCarNames(carNames);

    event.preventDefault();
    if (!validateCarNames(splitedCarNames)) {
      alert(
        '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
      );
      return;
    }

    store.setState({
      isVisibleTrial: true,
      racingMap: makeDefaultRacingMap(carNames),
    });
  }

  onTypeCarNames(event) {
    store.setState({ carNames: event.target.value });
  }

  render() {
    const { $target } = this;
    const { isVisibleTrial, carNames } = store.state;
    const $trialWrapper = $target.querySelector('.trial-count-wrapper');
    const $carNameInput = $target.querySelector('[data-id=car-name-input]');
    const $carSubmitButton = $target.querySelector('[data-id=submit-carname]');
    if (isVisibleTrial) {
      new Trial({
        $target: $trialWrapper,
      });
    }

    if (!isVisibleTrial && $trialWrapper.innerHTML.length) {
      $trialWrapper.innerHTML = '';
    }

    $carNameInput.setAttribute('value', carNames);

    if (!isVisibleTrial) {
      $carNameInput.focus();
    } else {
      $carSubmitButton.setAttribute('disabled', '');
    }
  }

  addEventListener() {
    EVENT_MAP.CLICK.set('submit-carname', this.onSubmitCarname.bind(this));
    EVENT_MAP.KEY_UP.set('car-name-input', this.onTypeCarNames.bind(this));
    EVENT_MAP.SUBMIT.set('submit-carname', this.onSubmitCarname.bind(this));
  }
}

export default Attempt;
