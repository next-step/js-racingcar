import { CarValidator } from '../validator/index.js';

class ErrorHandler {
  static confirmCarNames(racingCars) {
    try {
      CarValidator.validateCarNames(racingCars);
      return racingCars;
    } catch (error) {
      throw error;
    }
  }
}

export default ErrorHandler;
