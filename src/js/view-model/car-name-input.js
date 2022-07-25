import { generateCars } from "../model/index.js";
import { isOKToSendCarNamesToModel } from "../validate/validate-car-name.js"


export const handleCarNameInput = function (carNameInput) {
  const carNames = carNameInput.split(",");
  if(isOKToSendCarNamesToModel(carNames)) {
    // input, button freeze 시키기
    
    const cars = generateCars(carNames);
  }

}
