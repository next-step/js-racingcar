const RacingCycleView = (function () {
  const $racingCycleField = document.querySelector('#racing-cycle-field');
  const $racingCycleInput = $racingCycleField.querySelector(
    '#racing-cycle-input'
  );
  const $racingCycleSubmit = $racingCycleField.querySelector(
    '#racing-cycle-submit'
  );

  function notificationEmptyCycle() {
    alert('횟수를 입력하세요');
  }

  function isEmptyCycle(cycle) {
    return cycle === undefined || cycle === null || !cycle;
  }

  function handleCycleSubmit() {
    const cycle = $racingCycleInput.value;
    if (isEmptyCycle(cycle)) {
      notificationEmptyCycle();
    }
  }

  function initialize() {
    $racingCycleSubmit.addEventListener('click', handleCycleSubmit);
  }

  function showView() {
    $racingCycleField.classList.remove('hide');
  }

  initialize();

  return { showView };
})();

export default RacingCycleView;
