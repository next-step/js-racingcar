import { CHARACTERS } from "../constants/Characters";
import { MESSAGE } from "../constants/Messages";

class ConsoleOutput {
  print(query) {
    console.log(query);
  }

  printWinners(cars) {
    const carNamesArr = cars.map((car) => car.getName());

    console.log(
      MESSAGE.WINNER_IS(carNamesArr.join(`${CHARACTERS.CAR_SEPERATOR} `))
    );
  }

  printAllPositions(cars) {
    cars.forEach((car) => {
      this.printEachPosition(car);
    });
    this.printNewLine();
  }

  printEachPosition(car) {
    console.log(
      `${car.getName()} : ${CHARACTERS.PROGRESS_UNIT.repeat(car.getPosition())}`
    );
  }

  printNewLine() {
    console.log();
  }
}

export default ConsoleOutput;
