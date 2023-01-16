import { ATTEMPTS_WRONG, ERROR_MESSAGE } from '../constant/index.js';

export default function validateAttemptCount(count) {
  if (count < ATTEMPTS_WRONG) throw Error(ERROR_MESSAGE.INVALID_ATTEMPT);
}
