import { readLineAsync } from "./utils/readLineSync.js";
import { CAR, MESSAGE } from "./constant/index.js";

export default class View {
  async askCarNames() {
    return await readLineAsync(MESSAGE.ASK_CAR_NAMES);
  }

  async askMaxRound() {
    return await readLineAsync(MESSAGE.ASK_MAX_ROUND);
  }

  displayForwardCar(car) {
    console.log(`${car.name} : ${CAR.POSITION_MARK.repeat(car.position)}`);
  }

  displayRaceRecords(records) {
    records.forEach((car) => this.displayForwardCar(car));
    console.log("");
  }

  displayWinners(winners) {
    console.log(
      `${winners.map((car) => car.name).join(CAR.NAME_SEPARATOR + " ")}${
        MESSAGE.WINNER
      }`
    );
  }
}
