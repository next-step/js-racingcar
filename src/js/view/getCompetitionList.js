import {
  CAR_FORWARD_CONDITION,
  CAR_RACING_INTERVAL_TIME,
} from '../constants/constants.js';
import { $, $$ } from '../selector/DOM.js';
import getCarNames from '../inputValue/getCarNames.js';
import getCompetitionCount from '../inputValue/getCompetitionCount.js';
import { getRandomNumber } from '../util/util.js';
import getRacingResult from './getRacingResult.js';
import { carForwardTemplate, carListTemplate } from './templates.js';

const isForwarded = () => {
  const { MIN, MAX, FORWARD } = CAR_FORWARD_CONDITION;

  if (getRandomNumber(MIN, MAX >= FORWARD)) {
    return true;
  }

  return false;
};

const setSpinnerInvisible = () => {
  $$('.spinner-container').forEach((element) =>
    element.classList.add('invisible')
  );
};

const renderCompetitionProcess = (totalCount) => {
  let count = 1;
  const spinners = $$('.spinner-container');

  const renderCarForward = setInterval(() => {
    if (count === totalCount) {
      clearInterval(renderCarForward);
    }

    spinners.forEach((car) => {
      if (isForwarded()) {
        car.insertAdjacentHTML('beforebegin', carForwardTemplate);
      }
    });

    count += 1;

    if (count - 1 === totalCount) {
      clearInterval(renderCarForward);
      setSpinnerInvisible();
      getRacingResult();
    }
  }, CAR_RACING_INTERVAL_TIME);
};

const getCompetitionRenderList = () =>
  getCarNames().map(carListTemplate).join('');

const getCompetitionList = () => {
  $('.competition-list').innerHTML = getCompetitionRenderList();
  renderCompetitionProcess(getCompetitionCount());
};

export default getCompetitionList;
