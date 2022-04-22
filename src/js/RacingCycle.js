const MIN_CYCLE = 1;
const MAX_CYCLE = 100;

class IRacingCycle {
  #isEmptyCycle(cycle) {
    return cycle === undefined || cycle === null || !cycle;
  }

  #isDisableRangeCycle(cycle) {
    return !(cycle >= MIN_CYCLE && cycle <= MAX_CYCLE);
  }

  #validateEmptyCycle(cycle) {
    if (this.#isEmptyCycle(cycle)) {
      throw new Error('횟수를 입력하세요.');
    }
  }

  #validateEnableRangeCycle(cycle) {
    if (this.#isDisableRangeCycle(cycle)) {
      throw new Error(
        `횟수를 ${MIN_CYCLE} ~ ${MAX_CYCLE} 사이 값을 입력하세요.`
      );
    }
  }

  validate(cycle) {
    this.#validateEmptyCycle(cycle);
    this.#validateEnableRangeCycle(cycle);
  }
}
const RacingCycle = new IRacingCycle();
Object.freeze(RacingCycle);
export default RacingCycle;
