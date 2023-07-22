import { splitCarNameToArray, Validator } from '../utils';

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
    this.#view.readCarName(this.#checkCarNameValidation);
  }

  #checkCarNameValidation(userInput) {
    const carNamesArray = splitCarNameToArray(userInput);
    try {
      carNamesArray.forEach((carName) =>
        Validator.isWithInMaxLength(carName, 5)
      );
    } catch (error) {}
  }
}
