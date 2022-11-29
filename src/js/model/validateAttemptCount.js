import { attempts, errorMessages } from '../constants.js';

export default function validateAttemptCount(count) {
  if(count > attempts.WRONG) return;

  throw Error(errorMessages.INVALID_ATTEMPT);
}