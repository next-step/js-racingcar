class RacingGame {
  cars = [];
  round = 0;
  totalRound;
  canMove;

  constructor(cars, totalRound = 5, canMove = () => true) {
    this.cars = cars;
    this.totalRound = totalRound;
    this.canMove = canMove;
  }

  *startRace() {
    while (this.round < this.totalRound) {
      this.#moveCars(this.canMove);
      this.round++;
      yield this.cars;
    }
  }

  #moveCars() {
    for (const car of this.cars) {
      car.moveForward(this.canMove);
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
