export const DEFAULT_RACING_ROUND_NUMBER = 5;

export default class RacingCarGame {
  cars;
  roundNumbers;
  onGameStart;
  onMultipleRoundStart;
  onSingleRoundStart;
  onSingleRoundEnd;
  onMultipleRoundEnd;
  onGameEnd;
  checkForAdvance;
  validateCarNames;
  onError;

  constructor({
    roundNumbers = DEFAULT_RACING_ROUND_NUMBER,
    onGameStart = () => {
      return new Promise((resolve) => resolve([]));
    },
    onMultipleRoundStart = () => {},
    onSingleRoundStart = () => {},
    onSingleRoundEnd = () => {},
    onMultipleRoundEnd = () => {},
    onGameEnd = () => {},
    checkForAdvance = () => {
      return false;
    },
    validateCarNames = () => {},
    onError = () => {},
  }) {
    this.cars = new Map();
    this.roundNumbers = roundNumbers;
    this.onGameStart = onGameStart;
    this.onGameEnd = onGameEnd;
    this.onError = onError;
    this.onMultipleRoundEnd = onMultipleRoundEnd;
    this.onMultipleRoundStart = onMultipleRoundStart;
    this.onSingleRoundStart = onSingleRoundStart;
    this.onSingleRoundEnd = onSingleRoundEnd;
    this.checkForAdvance = checkForAdvance;
    this.validateCarNames = validateCarNames;
  }

  async startGame() {
    try {
      const enteredCarNames = await this.onGameStart();

      this.validateCarNames(enteredCarNames);

      this.settingCars(enteredCarNames);

      this.executeMultipleRounds();
    } catch (error) {
      this.onError(error);
    } finally {
      this.endGame();
    }
  }

  endGame() {
    this.onGameEnd(this.cars);
  }

  settingCars(names) {
    names.forEach((name) => {
      this.cars.set(name, { distance: 0 });
    });
  }

  executeOneRound() {
    this.onSingleRoundStart(this.cars);

    this.cars.forEach((carInfo, carName) => {
      if (this.checkForAdvance(carName)) {
        carInfo.distance += 1;
        this.cars.set(carName, carInfo);
      }
    });

    this.onSingleRoundEnd(this.cars);
  }

  executeMultipleRounds() {
    this.onMultipleRoundStart(this.cars);

    Array.from({ length: this.roundNumbers }, () => {
      this.executeOneRound();
    });

    this.onMultipleRoundEnd(this.cars);
  }
}
