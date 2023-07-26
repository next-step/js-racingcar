export default class RacingView {
  racingModel;

  constructor(racingModel) {
    this.racingModel = racingModel;
  }

  showRacingGameProgress() {
    const carList = this.racingModel.getCarInfo();

    carList.forEach((car) => {
      console.log(`${car.name}: ${"-".repeat(car.position)}\n`);
    });
  }

  showRacingGameWinners() {
    const winners = this.racingModel.getWinners();

    if (winners.length === 0) {
      console.log("우승자는 없습니다.");
    } else {
      console.log(`우승자는 ${[...winners]}입니다`);
    }
  }
}
