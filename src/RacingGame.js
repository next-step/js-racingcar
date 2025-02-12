class RacingGame {
  cars = [];
  round = 0;
  totalRound;

  constructor(cars, totalRound = 5) {
    this.cars = cars;
    this.totalRound = totalRound;
  }

  *startRace(getCanMove) {
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
