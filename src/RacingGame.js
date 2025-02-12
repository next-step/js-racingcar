class RacingGame {
  cars = [];
  round = 0;
  totalRound;
  getCanMove;

  constructor(cars, totalRound = 5, getCanMove = () => true) {
    this.cars = cars;
    this.totalRound = totalRound;
    this.getCanMove = getCanMove;
  }

  *startRace() {
    while (this.round < this.totalRound) {
      this.#moveCars(this.getCanMove);
      this.round++;
      yield this.cars;
    }
  }

  #moveCars() {
    for (const car of this.cars) {
      car.moveForward(this.getCanMove);
    }
  }

  getWinners() {
    const maxPosition = Math.max(...this.cars.map((car) => car.position));
    const winners = [];

    for (const car of this.cars) {
      if (car.position !== maxPosition) continue;
      winners.push(car.name);
    }

    return winners;
  }
}

export default RacingGame;
