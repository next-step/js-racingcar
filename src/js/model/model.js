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

  get forward() {
    return (this.#position += 1);
  }
}

export const getCarClassList = (element) =>
  element.value.split(",").map((carName) => new Car(carName));

export const extractWinner = (racingCars) => {
  const winnerPosition = racingCars.reduce((max, {forward}) => {
    return forward > max ? forward : max;
  }, 0);

  const winner = racingCars.filter((car) => {
    return car.forward === winnerPosition;
  });

  return winner;
};
