class Race {
  static RaceConst = 5;

  constructor(cars) {
    this.cars = cars;
  }

  startRace() {
    let i = 0;
    while (Race.RaceConst > i) {
      i += 1;
      this.cars.forEach((car) => {
        car.moveForward();
        Race.getTrajectory(car);
      });
    }
  }

  static getTrajectory(car) {
    const location = car.getLocation();
    console.log(`${car.getName()} : ${'-'.repeat(location)}`);
  }
}

export default Race;
