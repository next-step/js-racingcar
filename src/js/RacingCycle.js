const MIN_CYCLE = 1;
const MAX_CYCLE = 100;

class RacingCycle {
  static #isEmptyCycle(cycle) {
    return cycle === undefined || cycle === null || !cycle;
  }

  static #isDisableRangeCycle(cycle) {
    return !(cycle >= MIN_CYCLE && cycle <= MAX_CYCLE);
  }

  static #validateEmptyCycle(cycle) {
    if (RacingCycle.#isEmptyCycle(cycle)) {
      throw new Error('횟수를 입력하세요.');
    }
  }

  static #validateEnableRangeCycle(cycle) {
    if (RacingCycle.#isDisableRangeCycle(cycle)) {
      throw new Error(
        `횟수를 ${MIN_CYCLE} ~ ${MAX_CYCLE} 사이 값을 입력하세요.`
      );
    }
  }

  static validate(cycle) {
    RacingCycle.#validateEmptyCycle(cycle);
    RacingCycle.#validateEnableRangeCycle(cycle);
  }
}
export default RacingCycle;
