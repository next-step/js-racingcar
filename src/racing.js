import { MOVABLE_RANGE } from "./Car";
import { getRandomNumber } from "./utils";

export const getWinners = (cars) => {
  const maxPosition = Math.max(...cars.map((car) => car.position));

  return cars.filter((car) => car.position === maxPosition).map((car) => car.name);
};

export const createCars = (carData, CarClass) => {
  return carData.map((data) => new CarClass(data));
};

export const executeLap = (cars) => {
  cars.forEach((car) => {
    const randomNumber = getRandomNumber(MOVABLE_RANGE.MIN, MOVABLE_RANGE.MAX);
    car.move(randomNumber);
    car.printPosition();
  });
};
