class Race {
  static DEFAULT_ROUNDS = 5;
  cars;
  rounds;
  result = [];

  constructor(cars) {
    this.cars = cars;
    this.rounds = Race.DEFAULT_ROUNDS;
  }

  moveCars(cars) {
    cars.map((car) => car.moveForward());
  }

  // 자동차는 1회에 1칸씩 이동
  start() {
    for (let round = 1; round <= this.rounds; round++) {
      this.moveCars(this.cars);

      this.result.push({
        round: round,
        cars: this.cars.map((car) => ({
          name: car.getName(),
          location: car.getLocation(),
        })),
      });
    }
  }
}

export default Race;
