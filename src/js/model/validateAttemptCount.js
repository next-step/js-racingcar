import { errorMessages } from '../constants.js';

export default function validateAttemptCount(count) {
  if(count > 0) return;

  throw Error(errorMessages.INVALID_ATTEMPT);
}