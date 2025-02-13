class RacingGame {
  cars = [];
  round = 0;
  totalRound;
  canMove;

  constructor(cars, totalRound = 5, canMove = () => true) {
    if (!this.#isValidTotalRound(totalRound)) {
      throw new InvalidRacingTotalRound();
    }
    this.cars = cars;
    this.totalRound = totalRound;
    this.canMove = canMove;
  }

  #isValidTotalRound(totalRound) {
    if (typeof totalRound !== "number") return false;
    if (!Number.isInteger(totalRound)) return false;
    if (totalRound <= 0) return false;
    return true;
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

export class InvalidRacingTotalRound extends Error {
  constructor() {
    super("자동차 경주의 총 라운드 값은 1 이상의 정수여야 합니다.");
  }
}
