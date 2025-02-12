class Race {
  static DEFAULT_ROUNDS = 5;
  cars;
  rounds;
  result = [];

  constructor(cars, rounds = Race.DEFAULT_ROUNDS) {
    this.cars = cars;
    this.rounds = rounds;
  }

  moveCars(cars) {
    cars.map((car) => {
      if (car.movingCondition()) {
        car.moveForward();
      }
    });
  }

  // 자동차는 1회에 1칸씩 이동
  start() {
    for (let round = 1; round <= this.rounds; round++) {
      this.moveCars(this.cars);
      this.recordRoundResult(round, this.cars);
    }
    return this.result;
  }

  recordRoundResult(round, cars) {
    this.result.push({
      round: round,

      cars: cars.map((car) => ({
        name: car.getName(),
        location: car.getLocation(),
      })),
    });
  }

  getWinners() {
    const locations = this.cars.map((car) => car.getLocation());
    const maxLocation = Math.max(...locations);

    const winnersCar = this.cars.filter(
      (car) => car.getLocation() === maxLocation
    );

    return winnersCar.map((car) => car.getName());
  }
}

export default Race;
