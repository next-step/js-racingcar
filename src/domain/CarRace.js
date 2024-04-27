import { joinCarNamesByComma, printCarsStatus } from "../utils/cars.js";

const TOTAL_RACE_COUNT = 5;
class CarRace {
  remaingRaceCount = TOTAL_RACE_COUNT;

  constructor(competitors) {
    this.competitors = competitors;
  }

  get winners() {
    const maxPosition = this.getMaxPosition();
    const winners = this.competitors.filter(
      (competitor) => competitor.position === maxPosition
    );

    return winners;
  }

  getMaxPosition() {
    const positionResults = this.competitors.map(
      (competitor) => competitor.position
    );
    const maxPosition = Math.max(...positionResults);

    return maxPosition;
  }

  race() {
    while (this.remaingRaceCount > 0) {
      this.competitors.forEach((competitor) => {
        competitor.moveRandom();
      });
      printCarsStatus(this.competitors);

      this.remaingRaceCount--;
    }
  }

  printWinners = () => {
    const joinedCarRaceWinners = joinCarNamesByComma(this.winners);

    console.log(`${joinedCarRaceWinners}가 최종 우승했습니다.`);
  };
}

export default CarRace;
