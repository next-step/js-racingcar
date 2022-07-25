import { errorMessage } from "../constant/message.js"
import { INPUT_CAR_NAME_MAX_LENGTH } from "../constant/number.js"

const fireError = function (message) {
  window.alert(message)
}

export const validateCarName = function (carName) {
  if(carName.length === 0) {
    fireError(errorMessage.INVALID_CAR_NAME)
    return false;
  } 
  if(carName.length > INPUT_CAR_NAME_MAX_LENGTH){
    fireError(errorMessage.INVALID_CAR_NAME)
    return false;
  }
  else {
    return true;
  }
}

export const isOKToSendCarNameInputToModel = function (carNameInput) {
  const carNames = carNameInput.split(",")
  return !(carNames.some((carName) => !validateCarName(carName)))
}