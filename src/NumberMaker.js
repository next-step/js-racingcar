import { MAX_RANDOM_NUMBER_RANGE } from './constants';

const NumberMaker = {
  genRandomNumber() {
    return Math.floor(Math.random() * MAX_RANDOM_NUMBER_RANGE);
  },

  genRacingCarRandomNumbers(racingCars) {
    const racingCarNumbers = [...racingCars];
    return racingCarNumbers.map(() => this.genRandomNumber());
  },
};

export default NumberMaker;
