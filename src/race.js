class Race {
  static RaceMaxCount = 5;

  static setTrajectory(car, array) {
    const location = car.getLocation();
    array.push(`${car.getName()} : ${'-'.repeat(location)}`);
  }

  constructor(cars) {
    this.cars = cars;
    this.result = [];
  }

  startRace() {
    let i = 0;

    while (Race.RaceMaxCount > i) {
      const array = [];
      i += 1;
      this.cars.forEach((car) => {
        car.moveForward();
        Race.setTrajectory(car, array);
      });

      this.result.push(array);
    }
    return this.getTrajectory();
  }

  getTrajectory() {
    return this.result;
  }
}

export default Race;
