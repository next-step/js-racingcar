const MIN_CYCLE = 1;
const MAX_CYCLE = 100;

const racingCycle = (function () {
  function isEmptyCycle(cycle) {
    return cycle === undefined || cycle === null || !cycle;
  }

  function isDisableRangeCycle(cycle) {
    return !(cycle >= MIN_CYCLE && cycle <= MAX_CYCLE);
  }

  function validateEmptyCycle(cycle) {
    if (isEmptyCycle(cycle)) {
      throw new Error('횟수를 입력하세요.');
    }
  }

  function validateEnableRangeCycle(cycle) {
    if (isDisableRangeCycle(cycle)) {
      throw new Error(
        `횟수를 ${MIN_CYCLE} ~ ${MAX_CYCLE} 사이 값을 입력하세요.`
      );
    }
  }

  function validate(cycle) {
    validateEmptyCycle(cycle);
    validateEnableRangeCycle(cycle);
  }
  return { validate };
})();
export default racingCycle;
