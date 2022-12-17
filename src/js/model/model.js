import {DOM} from "../constants/dom.js";
import {clearElementValue} from "../utils/index.js";

export class Car {
  #name = "";
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  get carName() {
    return this.#name.trim();
  }

  get position() {
    return this.#position;
  }

  forward(number) {
    return (this.#position += number);
  }
}

export const getCarClassList = (element) =>
  element.value.split(",").map((carName) => new Car(carName));

export const extractWinner = (racingCars) => {
  const winnerPosition = racingCars.reduce((max, {position}) => {
    return position > max ? position : max;
  }, 0);

  const winner = racingCars.filter((car) => {
    return car.position === winnerPosition;
  });

  return winner;
};

export const resetRacingCarModel = () => {
  clearElementValue(DOM.CAR_NAMES_ID_INPUT);
  clearElementValue(DOM.NUMBER_OF_ATTEMPTS_INPUT);
};
