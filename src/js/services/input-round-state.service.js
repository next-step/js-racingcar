import { StateService } from './state.service.js';
import { RoundRule } from '../common/enum.js';

export class InputRoundStateService extends StateService {
  validate() {
    return !(this.noValue() || this.#outOfRange());
  }

  #outOfRange() {
    return RoundRule.MIN > this.element.value;
  }
}
