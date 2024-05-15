import prompt from "../../utils/prompt.js";

import { validateCarName } from "./car.contract.js";

const CAR_NAME_INPUT_MESSAGE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분)\n";
const CAR_POSITION_MARKER = "-";

class CarView {
  async inputCarNames() {
    const message = CAR_NAME_INPUT_MESSAGE;
    const format = (input) => input.split(",").map((name) => name.trim());
    const validate = (carNameList) =>
      carNameList.map((name) => validateCarName(name));

    return await prompt({ message, validate, format });
  }

  printCarPosition(car) {
    console.log(`${car.name}: ${CAR_POSITION_MARKER.repeat(car.position)}`);
  }

  printCarsPosition(carList) {
    carList.forEach((car) => this.printCarPosition(car));
  }
}

export default CarView;
