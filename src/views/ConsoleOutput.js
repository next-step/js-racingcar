import { CAR_SEPERATOR, PROGRESS_UNIT } from "../constants/Characters";
import { WINNER_IS } from "../constants/Messages";

class ConsoleOutput {
  print(query) {
    console.log(query);
  }

  printWinners(cars) {
    const carNamesArr = cars.map((car) => car.getName());

    console.log(WINNER_IS(carNamesArr.join(`${CAR_SEPERATOR} `)));
  }

  printAllPositions(cars) {
    cars.forEach((car) => {
      this.printEachPosition(car);
    });
    this.printNewLine();
  }

  printEachPosition(car) {
    console.log(
      `${car.getName()} : ${PROGRESS_UNIT.repeat(car.getPosition())}`
    );
  }

  printNewLine() {
    console.log();
  }
}

export default ConsoleOutput;
