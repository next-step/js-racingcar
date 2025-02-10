class Race {
  static RaceMaxCount = 5;

  constructor(cars) {
    this.cars = cars;
    this.result = [];
  }

  startRace() {
    let i = 0;

    while (Race.RaceMaxCount > i) {
      this.moveCars();
      this.setTrajectory(i);

      i += 1;
    }
    return this.getTrajectory();
  }

  moveCars() {
    this.cars.forEach((car) => {
      car.moveForward();
      Race.racePrint(car);
    });
  }

  static racePrint(car) {
    console.log(`${car.getName()} : ${'-'.repeat(car.getLocation())}`);
    return `${car.getName()} : ${'-'.repeat(car.getLocation())}`;
  }

  setTrajectory(round) {
    this.result.push({
      round,
      trajectory: this.cars.map((car) => ({
        name: car.getName(),
        location: car.getLocation(),
      })),
    });
  }

  getTrajectory() {
    return this.result;
  }
}

export default Race;
