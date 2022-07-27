import { ALERT_TEXT, COMPETITION_COUNT } from './constants.js';
import { $ } from './DOM.js';
import getCompetitionCount from './getCompetitionCount.js';

const checkCompetitionCountValidation = () =>
  $('.competition-count-input').value >= COMPETITION_COUNT.MIN;

const enterCompetitionCount = (e) => {
  e.preventDefault();

  if (!checkCompetitionCountValidation()) {
    alert(ALERT_TEXT.COMPETITION_COUNT_ERROR);
    return;
  }
};

export default enterCompetitionCount;
