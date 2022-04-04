import RacingSectionView from './RacingSectionView.js';

const MIN_CYCLE = 1;
const MAX_CYCLE = 100;

const RacingCycleView = (function () {
  const $racingCycleField = document.querySelector('#racing-cycle-field');
  const $racingCycleInput = $racingCycleField.querySelector(
    '#racing-cycle-input'
  );
  const $racingCycleSubmit = $racingCycleField.querySelector(
    '#racing-cycle-submit'
  );

  function notificationEmptyCycle() {
    alert('횟수를 입력하세요.');
  }

  function notificationInvalidCycle() {
    alert(`횟수를 ${MIN_CYCLE} ~ ${MAX_CYCLE} 사이 값을 입력하세요.`);
  }

  function isEmptyCycle(cycle) {
    return cycle === undefined || cycle === null || !cycle;
  }

  function isInvalidCycle(cycle) {
    return !(cycle >= 1 && cycle <= 100);
  }

  function disabledCycleField() {
    $racingCycleField.disabled = true;
  }

  function handleCycleSubmit() {
    const cycle = $racingCycleInput.value;
    if (isEmptyCycle(cycle)) {
      notificationEmptyCycle();
      return;
    }

    if (isInvalidCycle(cycle)) {
      notificationInvalidCycle();
      return;
    }

    disabledCycleField();
    RacingSectionView.ready();
  }

  function eventBindings() {
    $racingCycleSubmit.addEventListener('click', handleCycleSubmit);
  }

  function showView() {
    $racingCycleField.classList.remove('hide');
  }

  eventBindings();

  return { showView };
})();

export default RacingCycleView;
