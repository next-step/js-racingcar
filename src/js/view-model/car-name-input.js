import { isOKToSendCarNameInputToModel } from "../validate/validate-car-name.js"


export const handleCarNameInput = function (carNameInput) {
 if(isOKToSendCarNameInputToModel(carNameInput)) {
  console.log('go')
 }

}
