import { Controller } from "./domain/Controller";
import { View } from "./view/View";

class App {
  #view;
  #controller;

  constructor() {
    this.#view = new View();
    this.#controller = new Controller();
  }

  async start() {
    await this.init();
    await this.play();
    this.result();
  }

  async init() {
    try {
      const carsInput = await this.#view.start();
      this.#controller.init(carsInput);
      this.#view.print(carsInput);
    } catch (e) {
      this.#view.error(e.message);
      await this.init();
    }
  }

  async play() {
    try {
      const roundTimesInput = await this.#view.roundTimes();
      this.#controller.play(roundTimesInput);
      this.#view.print(roundTimesInput);
    } catch (e) {
      this.#view.error(e.message);
      await this.play();
    }
  }

  result() {
    const rounds = this.#controller.rounds;
    this.#view.result(rounds);

    const winners = this.#controller.winners;
    this.#view.end(winners);
  }
}

export const app = new App();
