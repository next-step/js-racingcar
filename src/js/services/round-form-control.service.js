import { FormControlService } from './form-control.service.js';
import { RoundRule } from '../common/enum.js';

export class RoundFormControlService extends FormControlService {
  validate() {
    return !(this.noValue() || this.#outOfRange());
  }

  #outOfRange() {
    return RoundRule.MIN > this.element.value;
  }
}
