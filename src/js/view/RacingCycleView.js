import RacingSectionView from './RacingSectionView.js';
import RacingCycle from '../RacingCycle.js';

const $racingCycleField = document.querySelector('#racing-cycle-field');
const $racingCycleInput = $racingCycleField.querySelector(
  '#racing-cycle-input'
);

const RacingCycleView = (function () {
  function disabledCycleField() {
    $racingCycleField.disabled = true;
  }

  function enabledCycleField() {
    $racingCycleField.disabled = false;
  }

  function initializeCycle() {
    $racingCycleInput.value = null;
  }

  function showView() {
    $racingCycleField.classList.remove('hide');
  }

  function hideView() {
    $racingCycleField.classList.add('hide');
  }

  function cycleSubmit() {
    const cycle = $racingCycleInput.value;
    try {
      RacingCycle.validate(cycle);
      disabledCycleField();
      RacingSectionView.ready();
      RacingSectionView.start(cycle);
    } catch (e) {
      alert(e.message);
      console.error(e.message);
    }
  }

  function initialize() {
    enabledCycleField();
    initializeCycle();
    hideView();
  }

  return { cycleSubmit, initialize, showView };
})();
export default RacingCycleView;
