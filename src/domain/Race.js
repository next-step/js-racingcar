export class Race {
  #racingCars;
  racingResult;
  racingProgress;

  constructor(racingCars) {
    this.#racingCars = racingCars;
    this.racingResult = [];
    this.racingProgress = [];
  }

  get racingCars() {
    return this.#racingCars;
  }

  repeatRacing(racingCount, cars, randomMoveCount) {
    for (let i = 0; i < racingCount; i++) {
      cars.forEach((car) => {
        const randomValue = randomMoveCount();
        car.move(randomValue);
        this.racingProgress.push(car.name, car.position);
      });
    }
  }

  racingStart(racingCount, getRandomValue) {
    this.repeatRacing(racingCount, this.#racingCars, getRandomValue);

    this.racingResult = this.#racingCars
      .map((car) => ({ carName: car.name, currentPosition: car.position }))
      .sort((a, b) => b.currentPosition - a.currentPosition);
  }

  getRaceCount() {
    return RACING_COUNT;
  }

  get winners() {
    const winnerPosition = this.racingResult[0].currentPosition;
    return this.racingResult
      .filter((car) => winnerPosition <= car.currentPosition)
      .map((car) => car.carName)
      .join(',');
  }
}
