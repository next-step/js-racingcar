import { ALERT_TEXT, COMPETITION_COUNT } from '../constants/constants.js';
import { $ } from '../selector/DOM.js';
import getCompetitionList from '../view/getCompetitionList.js';
import { setElementDisabled, setVisible } from '../util/util.js';

const checkCompetitionCountValidation = (text) => text >= COMPETITION_COUNT.MIN;

const setCompetitionListVisible = () => {
  setVisible($('.competition-list-container'));
};

const setCompetitionCountFormDisabled = () => {
  setElementDisabled($('.competition-count-input'));
  setElementDisabled($('.competition-count-enter-button'));
};

const enterCompetitionCount = (e) => {
  e.preventDefault();

  if (!checkCompetitionCountValidation($('.competition-count-input').value)) {
    alert(ALERT_TEXT.COMPETITION_COUNT_ERROR);
    return;
  }
  setCompetitionCountFormDisabled();
  setCompetitionListVisible();
  getCompetitionList();
};

export default enterCompetitionCount;
