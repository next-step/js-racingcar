import { printCarsStatus } from "../utils/car.js";

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
}

export default CarRace;
