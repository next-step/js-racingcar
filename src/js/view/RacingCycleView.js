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

class IRacingCycleView extends AbstractView {
  #disabledCycleField() {
    $racingCycleField.disabled = true;
  }

  #enabledCycleField() {
    $racingCycleField.disabled = false;
  }

  #initializeCycle() {
    $racingCycleInput.value = null;
  }

  #handleCycleSubmit() {
    const cycle = $racingCycleInput.value;
    try {
      RacingCycle.validate(cycle);
      this.#disabledCycleField();
      RacingSectionView.ready();
      RacingSectionView.start(cycle);
    } catch (e) {
      alert(e.message);
      console.error(e.message);
    }
  }

  showView() {
    $racingCycleField.classList.remove('hide');
  }

  #hideView() {
    $racingCycleField.classList.add('hide');
  }

  initialize() {
    this.#enabledCycleField();
    this.#initializeCycle();
    this.#hideView();
  }

  eventBindings(onInitialize) {
    $racingCycleSubmit.addEventListener('click', () =>
      this.#handleCycleSubmit()
    );
    RacingSectionView.eventBindings(onInitialize);
  }
}
const RacingCycleView = new IRacingCycleView();
Object.freeze(RacingCycleView);
export default RacingCycleView;
