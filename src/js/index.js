import { handleAttemptNumber, handleCarNameButton } from './eventHendler.js';
import { $attemptForm, $carNameForm } from './utils/dom.js';

const bindEvent = () => {
  $carNameForm.addEventListener('submit', handleCarNameButton);
  $attemptForm.addEventListener('submit', handleAttemptNumber);
};

bindEvent();
