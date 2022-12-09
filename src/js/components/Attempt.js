import { EVENT_MAP } from '../constants.js';
import Component from '../core/Component.js';
import store from '../core/Store.js';
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
            <input type="text" class="w-100 mr-2 name-input" placeholder="자동차 이름" data-id="name-input"/>
            <button type="button" class="btn btn-cyan name-submit-button" data-id="submit-carname">확인</button>
          </div>
        </fieldset>
        <fieldset class="trial-count-wrapper">
        </fieldset>
      </form>
    `;
  }

  onSubmitCarname(event) {
    const carNames = store.getState({ name: 'carNames', that: this });
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

  onInputCarNames(event) {
    store.setState({ carNames: event.target.value });
  }

  handleButtonAttribute() {
    const $carSubmitButton = this.$target.querySelector(
      '[data-id=submit-carname]'
    );
    const isDisabledButton = isVisibleTrial || !carNames;
    const isVisibleTrial = store.getState({
      name: 'isVisibleTrial',
      that: this,
    });
    const carNames = store.getState({ name: 'carNames', that: this });

    if (isDisabledButton) $carSubmitButton.setAttribute('disabled', '');
    if (!isDisabledButton) $carSubmitButton.removeAttribute('disabled');
  }

  handleCarNameInput() {
    const $carNameInput = this.$target.querySelector('[data-id=name-input]');
    const isDisabledInput = isVisibleTrial;
    const isVisibleTrial = store.getState({
      name: 'isVisibleTrial',
      that: this,
    });
    const carNames = store.getState({ name: 'carNames', that: this });

    if (isDisabledInput) $carNameInput.setAttribute('disabled', '');
    if (!isDisabledInput) $carNameInput.focus();
    $carNameInput.value = carNames;
  }

  renderTrialComponent() {
    const $trialWrapper = this.$target.querySelector('.trial-count-wrapper');
    const isVisibleTrial = store.getState({
      name: 'isVisibleTrial',
      that: this,
    });

    if (isVisibleTrial) {
      new Trial({
        $target: $trialWrapper,
      });
    }
  }

  render() {
    const $trialWrapper = this.$target.querySelector('.trial-count-wrapper');
    const isVisibleTrial = store.getState({
      name: 'isVisibleTrial',
      that: this,
    });

    this.handleButtonAttribute();
    this.handleCarNameInput();
    this.renderTrialComponent();

    if (!isVisibleTrial) $trialWrapper.innerHTML = '';
  }

  addEventListener() {
    EVENT_MAP.CLICK.set('submit-carname', this.onSubmitCarname.bind(this));
    EVENT_MAP.KEY_UP.set('name-input', this.onInputCarNames.bind(this));
    EVENT_MAP.SUBMIT.set('submit-carname', this.onSubmitCarname.bind(this));
  }
}

export default Attempt;
