import { ALERT } from '../constants/alert.js';
import observer from '../core/observer.js';
import { store } from '../store/index.js';
import { splitingCarNames } from '../utils/index.js';
import CarNameSubmitButton from './button/carNameSubmitButton.js';
import CarNameInput from './input/carNameInput.js';
import Trial from './Trial.js';
class Attempt {
  constructor({ $target }) {
    this.$target = $target;
    $target.innerHTML = this.template();

    this.$submitCarNameButton = $target.querySelector('[data-id=submit-carname]');
    this.$carNameInput = $target.querySelector('[data-id=name-input]');
    this.$trialWrapper = $target.querySelector('.trial-count-wrapper');
    this.$attemptWrapper = $target.querySelector('.attempt-wrapper');

    new CarNameInput({
      $target: this.$carNameInput,
    });

    new CarNameSubmitButton({
      $target: this.$submitCarNameButton,
      props: {
        onSubmitCarname: this.onSubmitCarname,
      },
    });

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

  validateCarNames = (carNamesArray) => {
    if (!carNamesArray || !carNamesArray.length) return false;

    return carNamesArray.filter((name) => Boolean(name) === true).every((el) => el.length >= 1 && el.length < 6);
  };

  makeDefaultRacingMap = (carNames) =>
    splitingCarNames(carNames).reduce((map, carName, currIdx) => {
      const carId = `${carName}-${currIdx}`;
      map.set(carId, []);

      return map;
    }, new Map());

  onSubmitCarname(event) {
    const { carNames } = store.state;
    const splitedCarNames = splitingCarNames(carNames);

    event.preventDefault();

    if (!this.validateCarNames(splitedCarNames)) {
      alert(ALERT.INVALID_CARNAME);
      return;
    }

    store.setState({
      isVisibleTrial: true,
      racingMap: this.makeDefaultRacingMap(carNames),
    });
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
    this.renderTrialComponent();

    if (!store.state.isVisibleTrial) this.$trialWrapper.innerHTML = '';
  }

  addEventListener() {
    this.$attemptWrapper.addEventListener('submit', (event) => {
      this.onSubmitCarname(event);
    });
  }
}

export default Attempt;
