import { $, $$ } from './DOM.js';
import { setElementUsable } from './util.js';

const carNameInput = $('.car-name-input');
const competitionCountInput = $('.competition-count-input');

const setInvisible = () => {
  $('.competition-count-input-container').classList.remove('visible');
  $('.competition-list-container').classList.remove('visible');
  $('.competition-result').classList.remove('visible');
};

const resetInputValue = () => {
  carNameInput.value = '';
  competitionCountInput.value = '';
};

const setFormUsable = () => {
  setElementUsable(carNameInput);
  setElementUsable($('.car-name-enter-button'));
  setElementUsable(competitionCountInput);
  setElementUsable($('.competition-count-enter-button'));
};

const resetRacing = () => {
  setFormUsable();
  resetInputValue();
  setInvisible();
};

export default resetRacing;
