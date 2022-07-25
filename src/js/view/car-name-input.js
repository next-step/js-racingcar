import { $ } from "../utils.js";
import { buttonSelector, inputSelector } from "../constant/selector.js";
import { handleCarNameInput } from "../view-model/car-name-input.js";

export const addCarNameEvent = function () {
  const $carNameInput = $(inputSelector.INPUT_CAR_NAME);
  const $carNameSubmit = $(buttonSelector.SUBMIT_CAR_NAME);

  $carNameSubmit.addEventListener('click', () => {
      handleCarNameInput($carNameInput.value)
  })
  $carNameInput.addEventListener('keydown', ({key}) => {
    if(key === 'Enter') {
      handleCarNameInput($carNameInput.value)
    }
  }) 
}

export const freezeCarNameView = function () {
  $(inputSelector.INPUT_CAR_NAME).disabled = true;
  $(buttonSelector.SUBMIT_CAR_NAME).disabled = true;
}
