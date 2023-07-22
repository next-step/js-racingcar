import { splitCarNameToArray } from '../utils';

export class GameController {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;
  }

  play() {
    this.#readCarName();
  }

  #readCarName() {
    this.#view.readCarName(this.#createCarByName);
  }

  #createCarByName(userInput) {
    const carNamesArray = splitCarNameToArray(userInput);
  }
}
