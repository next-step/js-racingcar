import { ALERT_TEXT, COMPETITION_COUNT } from './constants.js';
import { $ } from './DOM.js';
import renderCompetitionList from './renderCompetitionList.js';
import { setElementDisabled, setVisible } from './util.js';

const checkCompetitionCountValidation = (element) =>
  element.value >= COMPETITION_COUNT.MIN;

const setCompetitionListVisible = () => {
  setVisible($('.competition-list-container'));
};

const setCompetitionCountFormDisabled = () => {
  setElementDisabled($('.competition-count-input'));
  setElementDisabled($('.competition-count-enter-button'));
};

const enterCompetitionCount = (e) => {
  e.preventDefault();

  if (!checkCompetitionCountValidation($('.competition-count-input'))) {
    alert(ALERT_TEXT.COMPETITION_COUNT_ERROR);
    return;
  }
  setCompetitionCountFormDisabled();
  setCompetitionListVisible();
  renderCompetitionList();
};

export default enterCompetitionCount;
