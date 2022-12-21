import { ALERT } from '../constants.js';
import observer from '../core/observer.js';
import { store } from '../store/index.js';
import {
  makeDefaultRacingMap,
  splitingCarNames,
  validateCarNames,
} from '../utils/index.js';
import Trial from './Trial.js';

class Attempt {
  constructor({ $target }) {
    this.$target = $target;
    $target.innerHTML = this.template();
    this.$submitCarNameButton = $target.querySelector(
      '[data-id=submit-carname]'
    );
    this.$carNameInput = $target.querySelector('[data-id=name-input]');
    this.$trialWrapper = $target.querySelector('.trial-count-wrapper');

    observer.observe(() => {
      this.render();
      this.addEventListener();
    });
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
    const { carNames } = store.state;
    const splitedCarNames = splitingCarNames(carNames);

    event.preventDefault();

    if (!validateCarNames(splitedCarNames)) {
      alert(ALERT.INVALID_CARNAME);
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

  renderSubmitButton() {
    const { carNames, isVisibleTrial } = store.state;

    const isDisabledButton = isVisibleTrial || !carNames;

    if (isDisabledButton)
      this.$submitCarNameButton.setAttribute('disabled', '');
    if (!isDisabledButton)
      this.$submitCarNameButton.removeAttribute('disabled');
  }

  renderCarNameInput() {
    const { isVisibleTrial, carNames } = store.state;

    if (!isVisibleTrial) {
      this.$carNameInput.focus();
      return;
    }

    if (isVisibleTrial) this.$carNameInput.setAttribute('disabled', '');

    this.$carNameInput.value = carNames;
  }

  renderTrialComponent() {
    const { isVisibleTrial } = store.state;

    if (isVisibleTrial) {
      new Trial({
        $target: this.$trialWrapper,
      });
    }
  }

  render() {
    this.renderSubmitButton();
    this.renderCarNameInput();
    this.renderTrialComponent();

    if (!store.state.isVisibleTrial) this.$trialWrapper.innerHTML = '';
  }

  addEventListener() {
    this.$submitCarNameButton.addEventListener('click', (event) => {
      this.onSubmitCarname(event);
    });

    this.$carNameInput.addEventListener('keyup', (event) => {
      this.onInputCarNames(event);
    });

    // EVENT_MAP.SUBMIT.set('submit-carname', this.onSubmitCarname.bind(this));
  }
}

export default Attempt;
