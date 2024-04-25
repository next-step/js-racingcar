import { ROUND_TIMES } from "./const/RacingConfig";

export class App {
  view;
  controller;

  constructor(view, controller) {
    this.view = view;
    this.controller = controller;
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
