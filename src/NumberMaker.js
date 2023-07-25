class NumberMaker {
  static genRandomNumber(maxValue) {
    return Math.floor(Math.random() * maxValue);
  }

  static genRacingCarRandomNumbers(racingCars) {
    const racingCarNumbers = [...racingCars];
    return racingCarNumbers.map(() => this.genRandomNumber(10));
  }
}

export default NumberMaker;
