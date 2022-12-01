import { handleCarNameButton } from './eventHendler.js';
import { $carNameForm } from './utils/dom.js';

const bindEvent = () => {
  $carNameForm.addEventListener('submit', handleCarNameButton);
};

bindEvent();
