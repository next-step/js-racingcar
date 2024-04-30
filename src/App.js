import { Controller } from "./Controller";
import { View } from "./View";
import { ROUND_TIMES } from "./const/RacingConfig";

class App {
  view;
  controller;

  constructor() {
    this.view = new View();
    this.controller = new Controller();
  }

  async start() {
    const input = await this.view.start();
    console.log(input);

    this.controller.init(input);
    this.controller.play(ROUND_TIMES);

    const rounds = this.controller.rounds;
    this.view.result(rounds);

    const winners = this.controller.winners;
    this.view.end(winners);
  }
}

export const app = new App();
