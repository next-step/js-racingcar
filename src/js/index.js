import { checkValidation, isCarNameInputPassCondition, isMinimumCountValidate } from './validate/index.js';
import Calculate from './service/Calculate.js';
import RacingService from './service/RacingService.js';
import { removeHiddenClass } from './utils.js';
import FieldsetView from './view/FieldsetView.js';
import CreateTemplate from './service/CreateTemplate.js';
import { ALERT_MESSAGE } from './constants.js';

const $carNameForm = document.querySelector('#car-name-form');
const $carNameFieldset = $carNameForm.querySelector('#car-name');
const $carNameFieldsetInput = $carNameForm.querySelector('input[name="car-name-input"]');

const $carTrySection = document.querySelector('#car-try-section');
const $carTryNumberForm = $carTrySection.querySelector('#car-try-number-form');
const $carTryNumberFieldset = $carTryNumberForm.querySelector('#car-try-number');
const $carTryNumberFieldsetInput = $carTryNumberForm.querySelector('input[name="car-try-number-input"]');

const $racingSection = document.querySelector('#game');
const $racingCarPlayer = $racingSection.querySelector('.car-player-wrapper');

const carNameField = new FieldsetView($carNameFieldset);
const carTryNumberField = new FieldsetView($carTryNumberFieldset);
const createTemplate = new CreateTemplate();
const calculate = new Calculate();
const racing = new RacingService(createTemplate, calculate);

const renderCarNameFieldset = (e) => {
  e.preventDefault();

  const splitted = carNameField.getSplitInputValue($carNameFieldsetInput);

  try {
    const inputCondition = isCarNameInputPassCondition(splitted);
    checkValidation(inputCondition, ALERT_MESSAGE.INVALID_CAR_NAME_LENGTH);

    carNameField.applyFieldsetDisabled();

    $racingCarPlayer.innerHTML = createTemplate.createRacingListTemplate(splitted);
    removeHiddenClass($carTrySection);

    $carTryNumberFieldsetInput.focus();
  } catch (error) {
    alert(error.message);
  }
};

const renderRacingSection = (coin) => {
  racing.startRacingGame(coin);
};

const renderCarTryInputSection = (e) => {
  e.preventDefault();

  const carTryInputValue = carTryNumberField.getInputValue($carTryNumberFieldsetInput);

  const coin = parseInt(carTryInputValue, 10);

  try {
    const inputCondition = isMinimumCountValidate(carTryInputValue);
    checkValidation(inputCondition, ALERT_MESSAGE.INVALID_RACING_COUNT);

    carTryNumberField.applyFieldsetDisabled();
    removeHiddenClass($racingSection);

    renderRacingSection(coin);
  } catch (error) {
    alert(error.message);
  }
};

$carNameForm.addEventListener('submit', renderCarNameFieldset);
$carTryNumberForm.addEventListener('submit', renderCarTryInputSection);
