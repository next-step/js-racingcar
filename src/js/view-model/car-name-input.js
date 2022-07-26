import { generateCars } from "../model/make-car.js";
import { racingGameStore } from "../model/racing-game-store.js";
import { isOKToSendCarNamesToModel } from "../validate/car-name.js"
import { freezeCarNameView } from "../view/car-name-input.js";
import { focusOnTryInput, showCarTryInput } from "../view/car-try-input.js";


export const handleCarNameInput = function (carNameInput) {
  const carNames = carNameInput.split(",");
  if(isOKToSendCarNamesToModel(carNames)) {
    racingGameStore.setCars(generateCars(carNames))
    freezeCarNameView();
    showCarTryInput();
    focusOnTryInput();
  }
}
