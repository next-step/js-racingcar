const RACING_COUNT = 5;

export class Race {
  racingCars;
  racingResult;
  constructor(racingCars) {
    this.racingCars = racingCars;
    this.racingResult = [];
  }

  racingStart() {
    for (let racingRepeatCount = 0; racingRepeatCount < 5; racingRepeatCount++) {
      this.racingCars.map((car) => {
        car.getRandomValue();
        car.move();
      });
    }
    this.racingResult = this.racingCars
      .map((car) => {
        return {
          carName: car.getName(),
          currentPosition: car.getPosition(),
        };
      })
      .sort((a, b) => {
        return b.currentPosition - a.currentPosition;
      });
  }

  getWinner() {
    const winnerPosition = this.racingResult[0].currentPosition;
    return this.racingResult.filter((car) => winnerPosition <= car.currentPosition);
  }
}
