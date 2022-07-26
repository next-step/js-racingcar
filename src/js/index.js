import enterCarNames from './enterCarNames.js';
import { $ } from './DOM.js';

const enterCarNamesButton = $('.car-name-enter-button');
const enterCompetitionCountButton = $('.competition-count-enter-button');

const init = () => {
  enterCarNamesButton.addEventListener('click', enterCarNames);
  enterCompetitionCountButton.addEventListener('click', () => {});
};

window.onload = () => {
  init();
};
