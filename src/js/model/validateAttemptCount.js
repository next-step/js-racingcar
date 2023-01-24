import { attempts, errorMessages } from '../constants.js';

export default function validateAttemptCount(count) {
  if (count > attempts.WRONG) return count;

  throw Error(errorMessages.INVALID_ATTEMPT);
}
