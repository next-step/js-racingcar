import { StateService } from './state.service.js';
import { PlayerRule } from '../common/enum.js';
import { ArrayUtil } from '../utils/array.util.js';

export class InputPlayerStateService extends StateService {
  validate() {
    return !(this.noValue() || this.#inValidLength());
  }

  #inValidLength() {
    const arr = ArrayUtil.toTrim(this.element.value.split(','));
    return arr.some(el => PlayerRule.MIN > el.length || PlayerRule.MAX < el.length);
  }

  getValue() {
    return ArrayUtil.toTrim(this.element.value.split(','));
  }
}
