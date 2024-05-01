export class Race {
  #racingCars;
  racingResult;
  #racingProgress;

  constructor() {
    this.racingResult = [];
    this.#racingProgress = [];
  }

  get racingCars() {
    return this.#racingCars;
  }

  get racingProgress() {
    return this.#racingProgress;
  }

  set racingCars(racingCars) {
    this.#racingCars = racingCars;
  }

  repeatRacing(racingCount, cars, getRandomValue) {
    let per_race = [];

    for (let i = 0; i < racingCount; i++) {
      cars.forEach((car) => {
        const randomValue = getRandomValue();
        car.move(randomValue);
        per_race.push({ name: car.name, position: car.position });
      });

      this.#racingProgress.push(per_race);
      per_race = [];
    }
  }

  racingStart(racingCount, getRandomValue) {
    this.repeatRacing(racingCount, this.#racingCars, getRandomValue);

    this.racingResult = this.#racingCars
      .map((car) => ({ carName: car.name, currentPosition: car.position }))
      .sort((a, b) => b.currentPosition - a.currentPosition);
  }

  get winners() {
    const winnerPosition = this.racingResult.at(0).currentPosition;
    return this.racingResult
      .filter((car) => winnerPosition <= car.currentPosition)
      .map((car) => car.carName)
      .join(',');
  }
}
