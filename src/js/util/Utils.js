import { Constants } from '../constants/constants.js';

export default class Utils {
  isValidCarName(carName) {
    return carName.length < Constants.CAR_NAME_MIN_LENGTH || carName.length > Constants.CAR_NAME_MAX_LENGTH;
  }

  isInvalidTryCount(countInput) {
    return countInput < Constants.TRY_COUNT_MIN_VALUE || countInput > Constants.TRY_COUNT_MAX_VALUE;
  }

  getRandomNumber() {
    return Math.random() * Constants.RANDOM_NUMBER_MAX_VALUE;
  }

  isMoveForwardNumber(randomNumber) {
    return randomNumber >= Constants.MOVE_FORWARD_MIN_NUMBER && randomNumber <= Constants.MOVE_FORWARD_MAX_NUMBER;
  }
}
