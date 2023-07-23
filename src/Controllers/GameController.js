import { MESSAGE, VALIDATOR } from '../constants';
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
    this.#view.readCarName(this.#validateCarName);
  }

  #validateCarName(userInput) {
    const carNamesArray = splitCarNameToArray(userInput);
    carNamesArray.forEach((carName) => {
      const isValid = Validator.isWithInMaxLength(
        carName,
        VALIDATOR.MAX_CAR_NAME_LENGTH
      );

      if (!isValid) {
        throw new Error(
          MESSAGE.ERROR.IS_WITH_IN_MAX_LENGTH(VALIDATOR.MAX_CAR_NAME_LENGTH)
        );
      }
    });
  }
}
