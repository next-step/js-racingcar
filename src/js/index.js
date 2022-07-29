import { isCarNameValidate } from './validate/index.js';
import CreateTemplate from './service/CreateRacingcarTemplate.js';
import { displayTemplate, removeHiddenClass } from './utils.js';
import FieldsetView from './view/FieldsetView.js';

const $carNameForm = document.querySelector('#car-name-form');
const $carNameFieldset = $carNameForm.querySelector('#car-name');
const $carNameFieldsetInput = $carNameForm.querySelector('input[name="car-name-input"]');

const $carTrySection = document.querySelector('#car-try-section');
const $carTryNumberForm = $carTrySection.querySelector('#car-try-number-form');
const $carTryNumberFieldsetInput = $carTryNumberForm.querySelector('input[name="car-try-number-input"]');

const $racingSection = document.querySelector('#game');
const $racingCarPlayer = $racingSection.querySelector('.car-player-wrapper');

const carNameField = new FieldsetView($carNameFieldset, $carNameFieldsetInput);
const createTemplate = new CreateTemplate();

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

$carNameForm.addEventListener('submit', renderCarNameFieldset);
