import { duplicateTemplate, makeDisableByID } from '../utils/templateUtil.js';
import { ID, TEMPLATE } from '../constants/selector.js';

const UserRacingInput = ({ setGames, updateGameConfiguration }) => {
  let isNameSubmitted = false;
  const $currentElement = duplicateTemplate(TEMPLATE.RACING_CAR_INPUT_SECTION);

  $currentElement.id = ID.USER_RACING_INPUT_SECTION;

  const submitName = () => {
    const inputNames = document
      .getElementById(ID.CAR_NAME_INPUT)
      .value.split(',');

    makeDisableByID(ID.CAR_NAME_INPUT);
    makeDisableByID(ID.CAR_NAME_SUBMIT_BTN);

    updateGameConfiguration.updateCarNames(inputNames);

    isNameSubmitted = true;

    removeTimesInputWillChangeHint();

    document.getElementById(ID.RACING_TIMES_INPUT).focus();
  };

  const submitTimes = () => {
    const times = document.getElementById(ID.RACING_TIMES_INPUT).valueAsNumber;

    if (!times) return;

    updateGameConfiguration.updatePlayTimes(times);

    makeDisableByID(ID.RACING_TIMES_INPUT);
    makeDisableByID(ID.RACING_TIMES_SUBMIT_BTN);

    setGames();
  };

  const setEvent = () => {
    $currentElement.addEventListener('submit', e => {
      e.preventDefault();
      !isNameSubmitted ? submitName() : submitTimes();
    });
  };

  const setTimesInputWillChangeHint = () => {
    const $timesInput = $currentElement.querySelector('form').lastElementChild;
    $timesInput.style.willChange = 'transform, opacity';
    $timesInput.style.opacity = 0;
  };

  const removeTimesInputWillChangeHint = () => {
    const $timesInput = $currentElement.querySelector('form').lastElementChild;
    $timesInput.style.opacity = 1;
    $timesInput.style.willChange = 'auto';
  };

  const initUserInput = () => {
    $currentElement.id = ID.USER_RACING_INPUT;
    document
      .getElementById(ID.APP)
      .insertAdjacentElement('afterbegin', $currentElement);

    setEvent();
    setTimesInputWillChangeHint();
  };

  initUserInput();
};

export default UserRacingInput;
