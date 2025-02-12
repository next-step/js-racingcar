class RacingGame {
  cars = [];
  round = 0;
  totalRound;

  constructor(cars, totalRound = 5) {
    this.cars = cars;
    this.totalRound = totalRound;
  }

  *startRace(getCanMove = () => true) {
    while (this.round < this.totalRound) {
      this.#moveCars(getCanMove);
      this.round++;
      yield this.cars;
    }
  }

  #moveCars(getCanMove) {
    for (const car of this.cars) {
      car.moveForward(getCanMove);
    }
  }
}

export default RacingGame;
