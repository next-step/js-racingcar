import enterCarNames from './enterInput/enterCarNames.js';
import { $ } from './selector/DOM.js';
import enterCompetitionCount from './enterInput/enterCompetitionCount.js';
import resetRacing from './view/resetRacing.js';

const carNameInputForm = $('.car-name-input-container');
const competitionCountInputForm = $('.competition-count-input-container');
const resetRacingButton = $('.racing-reset-button');

const init = () => {
  carNameInputForm.addEventListener('submit', enterCarNames);
  competitionCountInputForm.addEventListener('submit', enterCompetitionCount);
  resetRacingButton.addEventListener('click', resetRacing);
};

window.onload = () => {
  init();
};
