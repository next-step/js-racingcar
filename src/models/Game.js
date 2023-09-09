import readlineSync from "readline-sync";

import Race from "./Race";
import Car from "./Car";

export class Game {
  race;
  constructor() {
    this.race = new Race();
  }

  start() {
    const names = this.getNames();
    this.race.setCars(...names);
  }

  getNames() {
    const names = readlineSync
      .question(
        "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)."
      )
      .split(",");
    return names;
  }
}
