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
    console.log(`우승자는 ${[...winners]}입니다`);
  }
}
