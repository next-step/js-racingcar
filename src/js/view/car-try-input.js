import { $ } from "../utils.js";
import { buttonSelector, fieldSelector, inputSelector } from "../constant/selector.js";
import { handleCarTryInput } from "../view-model/car-try-input.js";

export const showCarTryInput = function () {
  $(fieldSelector.CAR_TRY_FIELD).classList.remove('d-none')
}

export const addCarTryEvent = function() {
  const $carTryInput = $(inputSelector.INPUT_CAR_TRY);
  const $carTrySubmit = $(buttonSelector.SUBMIT_CAR_TRY);

  $carTrySubmit.addEventListener('click', () => {
    handleCarTryInput($carTryInput.valueAsNumber)
  })
  $carTryInput.addEventListener('keydown', (ev) => {
    if(ev.key === "Enter") {
      handleCarTryInput($carTryInput.valueAsNumber)
    }
  })
}
