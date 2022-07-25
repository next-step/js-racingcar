import { generateCars } from "../model/index.js";
import { isOKToSendCarNamesToModel } from "../validate/validate-car-name.js"
import { freezeCarNameView } from "../view/car-name-input.js";


export const handleCarNameInput = function (carNameInput) {
  const carNames = carNameInput.split(",");
  if(isOKToSendCarNamesToModel(carNames)) {
    freezeCarNameView();
    const cars = generateCars(carNames);
    console.log(cars)
  }

}
