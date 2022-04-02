import { duplicateTemplate, makeDisableByID } from '../utils/templateUtil.js';
import { ERROR } from '../constants/message.js';
import { MAX_RACING_CAR_NAME } from '../constants/unit.js';
import { ID, TEMPLATE } from '../constants/selector.js';
import ValidationError from '../utils/validation.js';

const UserRacingInput = ({ startGame }) => {
  let state = {
    isNameSubmitted: false,
    carNames: [],
    playTimes: 0,
  };

  const $currentElement = duplicateTemplate(TEMPLATE.RACING_CAR_INPUT_SECTION);
  $currentElement.id = ID.USER_RACING_INPUT_SECTION;

  const updateState = newState => (state = Object.assign(state, newState));

  const isValidCarName = inputNames => {
    const isValid = inputNames.every(
      carName => carName.length > 0 && carName.length <= MAX_RACING_CAR_NAME
    );

    if (!isValid)
      throw new ValidationError(ERROR.INVALID_LENGTH_RACING_CAR_NAME);
  };

  const submitName = () => {
    const inputNames = document
      .getElementById(ID.CAR_NAME_INPUT)
      .value.split(',');

    try {
      isValidCarName(inputNames);
      makeDisableByID(ID.CAR_NAME_INPUT);
      makeDisableByID(ID.CAR_NAME_SUBMIT_BTN);

      updateState({ carNames: inputNames, isNameSubmitted: true });

      removeTimesInputWillChangeHint();

      document.getElementById(ID.RACING_TIMES_INPUT).focus();
    } catch (err) {
      if (err instanceof ValidationError) alert(err.message);
      console.log(err);
    }
  };

  const submitTimes = () => {
    const times = document.getElementById(ID.RACING_TIMES_INPUT).value;

    if (!times) return;

    updateState({ playTimes: Number(times) });

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
