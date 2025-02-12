import generateRandomNumber from './shared/generateRandomNumber.js';

class Race {
  static boundaryNumber = 3;

  RaceMaxCount = 5;

  constructor(cars, count) {
    this.cars = cars;
    this.result = [];
    this.RaceMaxCount = count;
  }

  startRace() {
    let i = 0;

    while (this.RaceMaxCount > i) {
      this.moveCars();
      this.setTrajectory(i);

      i += 1;
    }
    return this.getTrajectory();
  }

  moveCars() {
    this.cars.forEach((car) => {
      if (generateRandomNumber() > Race.boundaryNumber) {
        car.moveForward();
      }
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
    const { trajectory } = this.result[this.RaceMaxCount - 1];

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
    return `${car.getName()} : ${'-'.repeat(car.getLocation())}`;
  }
}

export default Race;
