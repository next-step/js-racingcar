import enterCarNames from './enterCarNames.js';
import { $ } from './DOM.js';
import enterCompetitionCount from './enterCompetitionCount.js';
import resetRacing from './resetRacing.js';

const enterCarNamesButton = $('.car-name-enter-button');
const enterCompetitionCountButton = $('.competition-count-enter-button');
const resetRacingButton = $('.racing-reset-button');

const init = () => {
  enterCarNamesButton.addEventListener('click', enterCarNames);
  enterCompetitionCountButton.addEventListener('click', enterCompetitionCount);
  resetRacingButton.addEventListener('click', resetRacing);
};

window.onload = () => {
  init();
};
