import { isCarNameValidate, isMinimumCountValidate } from './validate/index.js';
import CreateTemplate from './service/CreateRacingcarTemplate.js';
import Calculate from './service/Calculate.js';
import RacingService from './service/RacingService.js';
import { displayTemplate, removeHiddenClass } from './utils.js';
import FieldsetView from './view/FieldsetView.js';

const $carNameForm = document.querySelector('#car-name-form');
const $carNameFieldset = $carNameForm.querySelector('#car-name');
const $carNameFieldsetInput = $carNameForm.querySelector('input[name="car-name-input"]');

const $carTrySection = document.querySelector('#car-try-section');
const $carTryNumberForm = $carTrySection.querySelector('#car-try-number-form');
const $carTryNumberFieldset = $carTryNumberForm.querySelector('#car-try-number');
const $carTryNumberFieldsetInput = $carTryNumberForm.querySelector('input[name="car-try-number-input"]');

const $racingSection = document.querySelector('#game');
const $racingCarPlayer = $racingSection.querySelector('.car-player-wrapper');

const carNameField = new FieldsetView($carNameFieldset, $carNameFieldsetInput);
const carTryNumberField = new FieldsetView($carTryNumberFieldset, $carTryNumberFieldsetInput);
const createTemplate = new CreateTemplate();
const calculate = new Calculate();
const racing = new RacingService(createTemplate, calculate);

const renderCarNameFieldset = (e) => {
  e.preventDefault();

  const splitInputValue = carNameField.getSplitInputValue();

  try {
    isCarNameValidate(splitInputValue);

    carNameField.applyFieldsetDisabled();

    const templateCarPlayer = createTemplate.createCarPlayer(splitInputValue);

    displayTemplate($racingCarPlayer, templateCarPlayer);
    removeHiddenClass($carTrySection);

    $carTryNumberFieldsetInput.focus();
  } catch (error) {
    alert(error.message);
  }
};

const renderRacingSection = (e) => {
  e.preventDefault();

  const carTryInputValue = carTryNumberField.getInputValue();

  const coin = parseInt(carTryInputValue, 10);

  try {
    isMinimumCountValidate(carTryInputValue);

    carTryNumberField.applyFieldsetDisabled();
    removeHiddenClass($racingSection);

    racing.startRacingGame(coin);
  } catch (error) {
    alert(error.message);
  }
};

$carNameForm.addEventListener('submit', renderCarNameFieldset);
$carTryNumberForm.addEventListener('submit', renderRacingSection);
