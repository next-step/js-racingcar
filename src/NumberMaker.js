import { MAX_RANDOM_NUMBER_RANGE } from './constants';

const NumberMaker = {
  createRandomNumber() {
    return Math.floor(Math.random() * MAX_RANDOM_NUMBER_RANGE);
  },

  getRacingCarRandomNumbers(racingCars) {
    const racingCarNumbers = [...racingCars];
    return racingCarNumbers.map(() => this.createRandomNumber());
  },
};

export default NumberMaker;
