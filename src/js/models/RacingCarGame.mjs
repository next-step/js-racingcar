class RacingCarGame {
  cars;
  tryCount;

  constructor() {
    this.cars = [];
    this.tryCount = 0;
  }

  get winnerCars() {
    const maxAdvance = Math.max(...this.cars.map(car => car.advanceCount));
    return this.cars.filter(car => car.advanceCount === maxAdvance).map(car => car.name);
  }
}

export default RacingCarGame;
