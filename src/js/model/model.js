import {DOM} from "../constants/dom.js";
import {clearElementValue} from "../utils/index.js";

export class Car {
  #name = "";
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  get name() {
    return this.#name.trim();
  }

  get position() {
    return this.#position;
  }

  forward(number) {
    this.#position += number;
  }
}

export const getCarClassList = (element) =>
  element.value.split(",").map((name) => new Car(name));

export const extractWinner = (racingCars) => {
  const winnerPosition = racingCars.reduce((max, {position}) => {
    return position > max ? position : max;
  }, 0);

  return racingCars.filter((car) => car.position === winnerPosition);
};

export const resetRacingCarModel = () => {
  clearElementValue(DOM.CAR_NAMES_ID_INPUT);
  clearElementValue(DOM.NUMBER_OF_ATTEMPTS_INPUT);
};
