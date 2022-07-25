import { isOKToSendCarNamesToModel } from "../validate/validate-car-name.js"


export const handleCarNameInput = function (carNameInput) {
  const carNames = carNameInput.split(",");
  if(isOKToSendCarNamesToModel(carNames)) {
    console.log('go')
  }

}
