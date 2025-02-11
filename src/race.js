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
      const isThreeOrMore = Race.randomNumber() > 3;
      if (isThreeOrMore) {
        car.moveForward();
      }
      Race.racePrint(car);
    });
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

  getWinner() {
    const { trajectory } = this.result[Race.RaceMaxCount - 1];

    const { winners } = trajectory.reduce(
      (acc, { name, location }) => {
        if (location > acc.max) {
          return { max: location, winners: [name] };
        }
        if (location === acc.max) {
          acc.winners.push(name);
        }
        return acc;
      },
      { max: 0, winners: [] },
    );

    return winners.join(', ');
  }

  getTrajectory() {
    return this.result;
  }

  static racePrint(car) {
    console.log(`${car.getName()} : ${'-'.repeat(car.getLocation())}`);
    return `${car.getName()} : ${'-'.repeat(car.getLocation())}`;
  }

  static randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}

export default Race;
