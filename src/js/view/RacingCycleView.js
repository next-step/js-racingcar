import RacingSectionView from './RacingSectionView.js';
import RacingCycle from '../RacingCycle.js';
import AbstractView from './AbstractView.js';

const $racingCycleField = document.querySelector('#racing-cycle-field');
const $racingCycleInput = $racingCycleField.querySelector(
  '#racing-cycle-input'
);
const $racingCycleSubmit = $racingCycleField.querySelector(
  '#racing-cycle-submit'
);

class RacingCycleView extends AbstractView {
  static #disabledCycleField() {
    $racingCycleField.disabled = true;
  }

  static #enabledCycleField() {
    $racingCycleField.disabled = false;
  }

  static #initializeCycle() {
    $racingCycleInput.value = null;
  }

  static #handleCycleSubmit() {
    const cycle = $racingCycleInput.value;
    try {
      RacingCycle.validate(cycle);
      RacingCycleView.#disabledCycleField();
      RacingSectionView.ready();
      RacingSectionView.start(cycle);
    } catch (e) {
      alert(e.message);
    }
  }

  static showView() {
    $racingCycleField.classList.remove('hide');
  }

  static #hideView() {
    $racingCycleField.classList.add('hide');
  }

  static initialize() {
    RacingCycleView.#enabledCycleField();
    RacingCycleView.#initializeCycle();
    RacingCycleView.#hideView();
  }

  static eventBindings(onInitialize) {
    $racingCycleSubmit.addEventListener(
      'click',
      RacingCycleView.#handleCycleSubmit
    );
    RacingSectionView.eventBindings(onInitialize);
  }
}
export default RacingCycleView;
