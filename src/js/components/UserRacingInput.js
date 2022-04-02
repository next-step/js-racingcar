import { duplicateTemplate, makeDisableByID } from '../utils/templateUtil.js';
import { ERROR } from '../constants/message.js';
import { MAX_RACING_CAR_NAME } from '../constants/unit.js';
import { TEMPLATE, ID } from '../constants/selector.js';

const UserRacingInput = ({ startGame }) => {
  const state = {
    isNameSubmitted: false,
    carNames: [],
    playTimes: 0,
  };

  const $currentElement = duplicateTemplate(TEMPLATE.RACING_CAR_INPUT);

  const isValidCarName = inputNames => {
    return inputNames.every(
      carName => carName.length > 0 && carName.length <= MAX_RACING_CAR_NAME
    );
  };

  const submitName = () => {
    const inputNames = document
      .getElementById(ID.CAR_NAME_INPUT)
      .value.split(',');

    if (!isValidCarName(inputNames)) {
      alert(ERROR.INVALID_LENGTH_RACING_CAR_NAME);
      return;
    }

    makeDisableByID(TEMPLATE.CAR_NAME_INPUT);
    makeDisableByID(ID.CAR_NAME_SUBMIT_BTN);

    state.carNames = inputNames;
    state.isNameSubmitted = true;

    $currentElement.querySelector('form').lastElementChild.style.opacity = 1;

    document.getElementById(ID.RACING_TIMES_INPUT).focus();
  };

  const submitTimes = () => {
    const times = document.getElementById(ID.RACING_TIMES_INPUT).value;

    if (!times) return;

    state.playTimes = Number(times);

    makeDisableByID(ID.RACING_TIMES_INPUT);
    makeDisableByID(ID.RACING_TIMES_SUBMIT_BTN);

    startGame({ carNames: state.carNames, playTimes: state.playTimes });
  };

  const setEvent = () => {
    $currentElement.addEventListener('submit', e => {
      e.preventDefault();
      !state.isNameSubmitted ? submitName() : submitTimes();
    });
  };

  const initUserInput = () => {
    $currentElement.id = ID.USER_RACING_INPUT;
    document
      .getElementById(ID.APP)
      .insertAdjacentElement('afterbegin', $currentElement);
    $currentElement.querySelector('form').lastElementChild.style.opacity = 0;
  };

  initUserInput();
  setEvent();
};

export default UserRacingInput;
