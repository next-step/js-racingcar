import { CAR_FORWARD_CONDITION } from './constants.js';
import { $, $$ } from './DOM.js';
import getCarNames from './getCarNames.js';
import getCompetitionCount from './getCompetitionCount.js';
import getRandomNumber from './getRandomNumber.js';
import getRacingResult from './getRacingResult.js';
import { carForwardTemplate, carListTemplate } from './templates.js';

const isForwardValidation = () => {
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
      if (isForwardValidation()) {
        car.insertAdjacentHTML('beforebegin', carForwardTemplate);
      }
    });

    count += 1;

    if (count - 1 === totalCount) {
      clearInterval(renderCarForward);
      setSpinnerInvisible();
      getRacingResult();
    }
  }, 1000);
};

const getCompetitionRenderList = () =>
  getCarNames()
    .map((name) => carListTemplate(name))
    .join('');

const renderCompetitionList = () => {
  $('.competition-list').innerHTML = getCompetitionRenderList();
  renderCompetitionProcess(getCompetitionCount());
};

export default renderCompetitionList;
