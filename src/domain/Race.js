export class Race {
  #racingCars;
  #racingProgress;

  constructor(racingCars) {
    this.#racingCars = racingCars;
    this.#racingProgress = [];
  }

  get racingCars() {
    return this.#racingCars;
  }

  get racingProgress() {
    return this.#racingProgress;
  }

  repeatRacing(racingCount, cars, getRandomValue) {
    for (let i = 0; i < racingCount; i++) {
      cars.forEach((car) => {
        const randomValue = getRandomValue();
        car.move(randomValue);
      });
      this.recordProgress(cars, i);
    }
  }

  recordProgress(cars, round) {
    const racingInfo = cars.map((car) => ({ name: car.name, position: car.position }));
    this.#racingProgress.push({ round: round, result: racingInfo });
  }

  startRacing(racingCount, getRandomValue) {
    this.repeatRacing(racingCount, this.#racingCars, getRandomValue);
  }

  get winners() {
    const winnerPosition = Math.max(...this.#racingCars.map((car) => car.position));

    return this.racingCars
      .filter((car) => winnerPosition <= car.position)
      .map((car) => car.name)
      .join(',');
  }
}
