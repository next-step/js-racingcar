class Race {
  static DEFAULT_ROUNDS = 5;
  cars;
  rounds;

  constructor(cars) {
    this.cars = cars;
    this.rounds = Race.DEFAULT_ROUNDS;
  }

  moveCars(cars) {
    cars.map((car) => car.moveForward());
  }
}

export default Race;
