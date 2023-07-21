import { Model, User } from '../Models';
import { View, InputView, OutputView } from '../Views';

export class GameController {
  #model;
  #view;

  constructor() {
    this.#model = new Model(new User());
    this.#view = new View(InputView, OutputView);
  }

  play() {}
}
