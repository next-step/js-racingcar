const RACING_COUNT = 5;

export class Race {
  racingCars;
  racingResult;
  constructor(racingCars) {
    this.racingCars = racingCars;
    this.racingResult = [];
  }

  racingStart() {
    for (let i = 0; i < RACING_COUNT; i++) {
      this.racingCars.forEach((car) => {
        car.move();
      });
    }
    this.racingResult = this.racingCars
      .map((car) => ({ carName: car.getName(), currentPosition: car.getPosition() }))
      .sort((a, b) => b.currentPosition - a.currentPosition);
  }

  getWinner() {
    const winnerPosition = this.racingResult[0].currentPosition;
    const winner = this.racingResult
      .filter((car) => winnerPosition <= car.currentPosition)
      .map((car) => car.carName)
      .join(',');

    return winner;
  }
}
