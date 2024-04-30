import { Controller } from "./Controller";
import { View } from "./View";

class App {
  view;
  controller;

  constructor() {
    this.view = new View();
    this.controller = new Controller();
  }

  async start() {
    const carsInput = await this.view.start();
    this.controller.init(carsInput);
    console.log(carsInput);

    const roundTimesInput = await this.view.roundTimes();
    this.controller.play(roundTimesInput);
    console.log(roundTimesInput);

    const rounds = this.controller.rounds;
    this.view.result(rounds);

    const winners = this.controller.winners;
    this.view.end(winners);
  }
}

export const app = new App();
