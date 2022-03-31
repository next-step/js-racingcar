import { ERROR } from '../constants/message.js';

const UserRacingInput = () => {
  // state
  const state = {
    isNameSubmitted: false,
    carNames: [],
    playTimes: 0,
  };

  // elements
  const $templateElement = document.getElementById('racing-car-input');
  const $targetElement = document.getElementById('app');
  const importedNode = document.importNode($templateElement.content, true);
  const $el = importedNode.firstElementChild;

  $el.id = 'user-racing-input';
  $targetElement.insertAdjacentElement('afterbegin', $el);
  $el.querySelector('form').lastElementChild.style.opacity = 0;

  const submitName = () => {
    const inputNames = $el.querySelector('#car-name-input').value;

    if (!inputNames) {
      alert(ERROR.EMPTY_RACING_CAR_NAME);
      return;
    }

    state.carNames = inputNames.split(',');
    state.isNameSubmitted = true;

    $el.querySelector('#car-name-input').setAttribute('disabled', true);
    $el.querySelector('#car-name-submit-btn').setAttribute('disabled', true);
    $el.querySelector('form').lastElementChild.style.opacity = 1;
    $el.querySelector('#racing-times-input').focus();
  };

  const submitTimes = () => {
    const times = $el.querySelector('#racing-times-input').value;

    state.playTimes = Number(times);

    $el.querySelector('#racing-times-input').setAttribute('disabled', true);
    $el
      .querySelector('#racing-times-submit-btn')
      .setAttribute('disabled', true);
    console.log(state);
  };

  const setEvent = () => {
    $el.addEventListener('submit', e => {
      e.preventDefault();
      !state.isNameSubmitted ? submitName() : submitTimes();
    });
  };

  setEvent();
};

export default UserRacingInput;
