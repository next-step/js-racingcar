import { readlineInterface } from "../utils/util";

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

  showRacingGameError() {
    console.log("잘못된 입력으로 인해 게임이 종료됩니다.");
    readlineInterface.close();
  }

  showRacingGameWinners() {
    const winners = this.racingModel.getWinners();
    console.log(`우승자는 ${[...winners]}입니다`);
  }
}
