import { registerCarName } from './controller/racingInputController.js';
import { $ } from './utils/selector.js';

const carNameButton = $('#car-name-submit');
const carNameInput = $('#car-name-input');

carNameButton.addEventListener('click', () => {
  registerCarName();
});
carNameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    registerCarName();
  }
});
