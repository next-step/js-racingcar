import RacingSectionView from './RacingSectionView.js';
import RacingCycle from '../RacingCycle.js';

const $racingCycleField = document.querySelector('#racing-cycle-field');
const $racingCycleInput = $racingCycleField.querySelector(
  '#racing-cycle-input'
);
const $racingCycleSubmit = $racingCycleField.querySelector(
  '#racing-cycle-submit'
);

class RacingCycleView {
  static #disabledCycleField() {
    $racingCycleField.disabled = true;
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

  static eventBindings() {
    $racingCycleSubmit.addEventListener(
      'click',
      RacingCycleView.#handleCycleSubmit
    );
  }
}
export default RacingCycleView;
