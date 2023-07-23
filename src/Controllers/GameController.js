import { splitCarNameToArray, validateCarName } from '../utils';

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
    this.#view.readCarName(this.#validateCarName);
  }

  #validateCarName(userInput) {
    const carNamesArray = splitCarNameToArray(userInput);
    carNamesArray.forEach((carName) => validateCarName(carName));

    this.#createCarByArray(carNamesArray);
  }

  #createCarByArray(carNamesArray) {
    this.#model.createCarByArray(carNamesArray);
  }
}
