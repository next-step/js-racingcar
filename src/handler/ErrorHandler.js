import { CarValidator } from '../validator/index.js';

class ErrorHandler {
  static confirmCarNames(racingCars) {
    CarValidator.validateCarNames(racingCars);
  }
}

export default ErrorHandler;
