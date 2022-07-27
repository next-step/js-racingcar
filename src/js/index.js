import enterCarNames from './enterCarNames.js';
import { $ } from './DOM.js';
import enterCompetitionCount from './enterCompetitionCount.js';

const enterCarNamesButton = $('.car-name-enter-button');
const enterCompetitionCountButton = $('.competition-count-enter-button');

const init = () => {
  enterCarNamesButton.addEventListener('click', enterCarNames);
  enterCompetitionCountButton.addEventListener('click', enterCompetitionCount);
};

window.onload = () => {
  init();
};
