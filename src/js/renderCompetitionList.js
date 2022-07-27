import { CAR_FORWARD_CONDITION } from './constants.js';
import { $, $$ } from './DOM.js';
import getCarNamesList from './getCarNamesList.js';
import getCompetitionCount from './getCompetitionCount.js';
import getRandomNumber from './getRandomNumber.js';
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
  const cars = $$('.process-container');

  const renderCarForward = setInterval(() => {
    if (count === totalCount) {
      clearInterval(renderCarForward);
      setSpinnerInvisible();
    }

    cars.forEach((car) => {
      if (isForwardValidation()) {
        car.insertAdjacentHTML('afterend', carForwardTemplate);
      }
    });
    count += 1;
  }, 1000);
};

const getCompetitionRenderList = () => {
  return getCarNamesList()
    .map((name) => carListTemplate(name))
    .join('');
};

const renderCompetitionList = () => {
  $('.competition-list').innerHTML = getCompetitionRenderList();
  renderCompetitionProcess(getCompetitionCount());
};

export default renderCompetitionList;
