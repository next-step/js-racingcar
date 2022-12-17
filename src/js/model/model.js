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

  /**@todo set 내용 확인 */
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
