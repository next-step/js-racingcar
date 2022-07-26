import { errorMessage } from "../constant/message.js"
import { INPUT_CAR_NAME_MAX_LENGTH } from "../constant/number.js"
import { fireError } from "../utils.js"

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

export const isOKToSendCarNamesToModel = function (carNames) {
  return !(carNames.some((carName) => !validateCarName(carName)))
}
