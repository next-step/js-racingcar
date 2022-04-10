const MIN_CYCLE = 1;
const MAX_CYCLE = 100;

class RacingCycle {
  static #notificationEmptyCycle() {
    alert('횟수를 입력하세요.');
  }

  static #notificationInvalidRangeCycle() {
    alert(`횟수를 ${MIN_CYCLE} ~ ${MAX_CYCLE} 사이 값을 입력하세요.`);
  }

  static #isEmptyCycle(cycle) {
    return cycle === undefined || cycle === null || !cycle;
  }

  static #isEnableRangeCycle(cycle) {
    return !(cycle >= MIN_CYCLE && cycle <= MAX_CYCLE);
  }

  static #validateEmptyCycle(cycle) {
    if (RacingCycle.#isEmptyCycle(cycle)) {
      RacingCycle.#notificationEmptyCycle();
      return false;
    }

    return true;
  }

  static #validateEnableRangeCycle(cycle) {
    if (RacingCycle.#isEnableRangeCycle(cycle)) {
      RacingCycle.#notificationInvalidRangeCycle();
      return false;
    }

    return true;
  }

  static validate(cycle) {
    return (
      RacingCycle.#validateEmptyCycle(cycle) &&
      RacingCycle.#validateEnableRangeCycle(cycle)
    );
  }
}
export default RacingCycle;
