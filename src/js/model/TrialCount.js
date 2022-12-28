import ERROR_MESSAGES from '../constant/errorMessages.js';
import { TRIAL_COUNT_MIN } from '../constant/racingcar.js';

class TrialCount {
  #value;

  constructor(value) {
    this.#value = value;
    this.#validateSize();
    this.#validateType();
  }

  #validateSize() {
    if (this.#value < TRIAL_COUNT_MIN) throw new Error(ERROR_MESSAGES.INVALID_TRIAL_COUNT);
  }

  #validateType() {
    if (typeof this.#value === 'number') {
      return;
    }
    throw new Error(ERROR_MESSAGES.INVALID_TYPE);
  }

  get value() {
    return this.#value;
  }
}

export default TrialCount;
