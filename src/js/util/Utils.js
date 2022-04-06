import { Constants } from '../constants/constants.js';

const Validator = {
  isValidCarName: carName =>
    carName.length < Constants.CAR_NAME_MIN_LENGTH || carName.length > Constants.CAR_NAME_MAX_LENGTH,

  isInvalidTryCount: countInput =>
    countInput < Constants.TRY_COUNT_MIN_VALUE || countInput > Constants.TRY_COUNT_MAX_VALUE,
};

const getRandomNumber = () => Math.floor(Math.random() * Constants.RANDOM_NUMBER_MAX_VALUE);

const isMoveForwardNumber = randomNumber =>
  randomNumber >= Constants.MOVE_FORWARD_MIN_NUMBER && randomNumber <= Constants.MOVE_FORWARD_MAX_NUMBER;

export { Validator, getRandomNumber, isMoveForwardNumber };
