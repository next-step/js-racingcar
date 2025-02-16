class RandomNumberGenerator {
  generate(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

class FakeRandomNumberGenerator extends RandomNumberGenerator {
  returnValue;

  constructor(returnValue) {
    super();
    this.returnValue = returnValue;
  }

  generate(min, max) {
    return this.returnValue;
  }
}

class RaceCondition {
  static THRESHOLD = 4;
  static MIN_VALUE = 0;
  static MAX_VALUE = 9;

  randomNumberGenerator;

  constructor(randomNumberGenerator = new RandomNumberGenerator()) {
    this.randomNumberGenerator = randomNumberGenerator;
  }

  check() {
    const randomNumber = this.randomNumberGenerator.generate(
      RaceCondition.MIN_VALUE,
      RaceCondition.MAX_VALUE
    );

    return randomNumber >= RaceCondition.THRESHOLD;
  }
}

export default RaceCondition;

export { FakeRandomNumberGenerator };
