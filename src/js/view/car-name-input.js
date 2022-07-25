import { $ } from "../utils.js";
import { buttonSelector, inputSelector } from "../constant/selector.js";
import { sendCarNameInputToModel } from "../view-model/car-name-input.js";

export const addCarNameEvent = function () {
  const $carNameInput = $(inputSelector.INPUT_CAR_NAME);
  const $carNameSubmit = $(buttonSelector.SUBMIT_CAR_NAME);

  $carNameSubmit.addEventListener('click', () => {
    sendCarNameInputToModel($carNameInput.value)
  })
  $carNameInput.addEventListener('keydown', ({key}) => {
    if(key === 'Enter') {
      sendCarNameInputToModel($carNameInput.value)
    }
  }) 
}
