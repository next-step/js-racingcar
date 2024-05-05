import { Race } from "./domain/race/Race.js";
import { View } from "./View.js";

export class App {
  async play() {
    try {
      const carNames = await this.#getCarNames();
      if (carNames.length === 0) return;

      const race = new Race(carNames);
      race.race();
      const winnerNames = race.findLeadingCars();
      View.printWinner(winnerNames);
    } catch (error) {
      console.log(error);
      console.log("Error");
    }
  }

  async #getCarNames() {
    const namesInput = await View.readLine(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
    );
    if (!namesInput) {
      throw new Error("잘못 된 자동차 이름입니다.");
    }

    return namesInput;
  }
}

const app = new App();
app.play();
