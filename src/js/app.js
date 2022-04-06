import {
  SELECTORS,
  MESSAGES,
  CAR_NAME_DIVIDER,
  CAR_NAME_REGEXP,
  CAR_NAME_MAX_LENGTH,
  CAR_ADVANCE_CONDITION_NUMBER,
  CAR_NAMES_MIN_LENGTH,
} from './constant.js';
import {
  templateRaceAdvance,
  templateRaceLapFieldset,
  templateRacePlayer,
  templateRaceTrack,
  templateRaceSpinner,
} from './template.js';
import racingCar from './racingcar.js';

const app = () => {
  const $carNamesInput = document.querySelector(SELECTORS.CAR_NAME_INPUT);
  const $carNamesSubmitButton = document.querySelector(SELECTORS.CAR_NAME_SUBMIT_BUTTON);
  let $raceLapInput;
  let $raceLapSubmitButton;
  let $raceTrack;

  function renderRaceTrack() {
    const $app = document.querySelector(SELECTORS.APP);
    $app.insertAdjacentHTML('beforeend', templateRaceTrack());
    $raceTrack = document.querySelector(SELECTORS.RACE_TRACK);
  }

  function renderRacePlayer({ name }) {
    $raceTrack.insertAdjacentHTML('beforeend', templateRacePlayer(name));
  }

  function renderRacing({ name, data }) {
    const $player = document.querySelector(`[data-player=${name}]`);
    const $spinner = $player.querySelector(SELECTORS.SPINNER);
    const isAdvanceCondition = data > CAR_ADVANCE_CONDITION_NUMBER;
    const isNotHasSpinner = !$spinner;

    if (isAdvanceCondition) {
      $spinner?.remove();
      $player.insertAdjacentHTML('beforeend', templateRaceAdvance());
    } else if (isNotHasSpinner) {
      $player.insertAdjacentHTML('beforeend', templateRaceSpinner());
    }
  }

  function racing() {
    racingCar.racing().forEach(renderRacing);

    const findRacingFinishedPlayer = ({ data }) => {
      return data.filter((number) => number > CAR_ADVANCE_CONDITION_NUMBER).length >= racingCar.getLap();
    };
    const isRacingFinished = racingCar.getCars().findIndex(findRacingFinishedPlayer) > -1;

    if (!isRacingFinished) racing();
  }

  function validateRaceLap() {
    const value = $raceLapInput.value.trim();

    if (!value) {
      alert(MESSAGES.RACE_LAP_EMPTY);
      return false;
    }

    return true;
  }

  function disableRaceLapForm() {
    $raceLapInput.setAttribute('disabled', true);
    $raceLapSubmitButton.setAttribute('disabled', true);
  }

  function submitRaceLapForm() {
    const value = $raceLapInput.value.trim();

    if (!validateRaceLap()) return;
    disableRaceLapForm();
    racingCar.setLap(value);
    renderRaceTrack();
    racingCar.getCars().forEach(renderRacePlayer);
    racing();
  }

  function renderRaceLapForm() {
    const $form = document.querySelector(SELECTORS.FORM);
    $form.insertAdjacentHTML('beforeend', templateRaceLapFieldset());
    $raceLapInput = document.querySelector(SELECTORS.RACE_LAP_INPUT);
    $raceLapSubmitButton = document.querySelector(SELECTORS.RACE_LAP_SUBMIT_BUTTON);
    $raceLapSubmitButton.addEventListener('click', submitRaceLapForm);
  }

  function validateCarNames() {
    const value = $carNamesInput.value.trim();
    const carNames = value.split(CAR_NAME_DIVIDER);
    const isCarNamesUnMatchRegExp = !CAR_NAME_REGEXP.test(value);
    const isCarNameMaxLengthOver = carNames.find((carName) => carName.trim().length > CAR_NAME_MAX_LENGTH);
    const isCarNamesMinLengthUnder = carNames.length < CAR_NAMES_MIN_LENGTH;

    if (!value) {
      alert(MESSAGES.CAR_NAME_EMPTY);
      return false;
    }

    if (isCarNamesUnMatchRegExp) {
      alert(MESSAGES.CAR_NAME_NOT_MATCH_REGEXP);
      return false;
    }

    if (isCarNameMaxLengthOver) {
      alert(MESSAGES.CAR_NAME_MAX_LENGTH_OVER);
      return false;
    }

    if (isCarNamesMinLengthUnder) {
      alert(MESSAGES.CAR_NAMES_MIN_LENGTH_UNDER);
      return false;
    }

    return true;
  }

  function disableCarNamesForm() {
    $carNamesInput.setAttribute('disabled', true);
    $carNamesSubmitButton.setAttribute('disabled', true);
  }

  function submitCarNamesForm() {
    const value = $carNamesInput.value.trim();
    const carNames = value.split(CAR_NAME_DIVIDER);

    if (!validateCarNames()) return;
    disableCarNamesForm();
    renderRaceLapForm();
    carNames.forEach(racingCar.addCar);
  }

  function initialize() {
    $carNamesSubmitButton.addEventListener('click', submitCarNamesForm);
  }

  return {
    initialize,
  };
};

export default app();
