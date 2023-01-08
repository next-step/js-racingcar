import { ALERT } from '../constants/alert.js';
import { ELEMENT } from '../constants/elements.js';
import { CAR_NAME } from '../constants/validation.js';
import { store } from '../store/index.js';
import { splitingCarNames } from '../utils/carName.js';
import CarNameSubmitButton from './button/carNameSubmitButton.js';
import CarNameInput from './input/carNameInput.js';
import TrialNumberRegister from './TrialNumberRegister.js';

class CarNameRegister {
  constructor({ $target }) {
    this.$target = $target;
    $target.innerHTML = this.template();

    this.$submitCarNameButton = $target.querySelector(ELEMENT.CAR_NAME_SUBMIT_BUTTON);
    this.$carNameInput = $target.querySelector(ELEMENT.CAR_NAME_INPUT);
    this.$trialWrapper = $target.querySelector(ELEMENT.TRIAL_COUNT_WRAPPER);
    this.$attemptWrapper = $target.querySelector(ELEMENT.ATTEMPT_WRAPPER);

    this.$attemptWrapper.addEventListener('submit', (event) => {
      this.onSubmitCarname(event);
    });

    new CarNameInput({
      $target: this.$carNameInput,
    });

    new CarNameSubmitButton({
      $target: this.$submitCarNameButton,
      props: {
        onSubmitCarname: this.onSubmitCarname,
      },
    });

    new TrialNumberRegister({
      $target: this.$trialWrapper,
    });
  }

  template() {
    return /*html*/ `
        <fieldset>
          <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
          <p>
            5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
            예시) EAST, WEST, SOUTH, NORTH
          </p>
          <form class="d-flex attempt-wrapper">
            <input type="text" class="w-100 mr-2 name-input" placeholder="자동차 이름" />
            <button type="button" class="btn btn-cyan name-submit-button">확인</button>
          </form>
        </fieldset>
        <fieldset class="trial-count-wrapper">
        </fieldset>
    `;
  }

  validateCarNames = (carNamesArray) => {
    if (!carNamesArray || !carNamesArray.length) return false;

    return carNamesArray
      .filter((name) => Boolean(name) === true)
      .every((el) => el.length >= CAR_NAME.MIN_LENGTH && el.length < CAR_NAME.MAX_LENGTH);
  };

  makeDefaultRacingMap = (carNames) =>
    splitingCarNames(carNames).reduce((map, carName, currIdx) => {
      const carId = `${carName}-${currIdx}`;
      map.set(carId, []);

      return map;
    }, new Map());

  onSubmitCarname = (event) => {
    event.preventDefault();

    const { carNames } = store.state;
    const splitedCarNames = splitingCarNames(carNames);

    if (!this.validateCarNames(splitedCarNames)) {
      alert(ALERT.INVALID_CARNAME);
      return;
    }

    store.setState({
      isVisibleTrial: true,
      racingMap: this.makeDefaultRacingMap(carNames),
    });
  };
}

export default CarNameRegister;
