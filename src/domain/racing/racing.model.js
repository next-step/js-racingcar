import { readLineAsync } from "../../utils/readline.js";
import { Car } from "../car/car.model.js";
import {
  INITIAL_CAR_LIST,
  INITIAL_ROUND,
  INITIAL_WINNER_LIST,
  RACING_ROUND,
  SETUP_MESSAGE,
} from "./racing.constant.js";

export class Racing {
  #round;
  #carList;
  #winnerList;

  constructor() {
    this.#round = INITIAL_ROUND;
    this.#carList = INITIAL_CAR_LIST;
    this.#winnerList = INITIAL_WINNER_LIST;
  }

  async setup() {
    const inputtedValue = await readLineAsync(SETUP_MESSAGE);
    const carNameList = inputtedValue
      .split(",")
      .map((carName) => carName.trim());

    this.#carList = carNameList.map((carName) => new Car({ name: carName }));
  }

  start() {
    while (this.#round < RACING_ROUND) {
      this.#carList.forEach((car) => {
        car.move();
        car.display();
      });
      this.#round++;
    }
  }

  end() {
    const maxPosition = Math.max(...this.#carList.map((car) => car.position));
    this.#winnerList = this.#carList.filter(
      (car) => car.position === maxPosition
    );
  }

  display() {
    const winnerList = this.#winnerList.map((car) => car.name).join(", ");
    const displayMessage = `${winnerList}가 최종 우승했습니다.`;

    console.log(displayMessage);

    return displayMessage;
  }

  get round() {
    return this.#round;
  }

  get carList() {
    return this.#carList;
  }

  get winnerList() {
    return this.#winnerList.map((car) => car.name);
  }
}
