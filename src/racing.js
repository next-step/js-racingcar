import { getRandomNumber } from "./utils";

const RANDOM_MIN = 0;
const RANDOM_MAX = 9;

export const getWinners = (cars) => {
  const maxPosition = Math.max(...cars.map((car) => car.position));

  return cars.filter((car) => car.position === maxPosition).map((car) => car.name);
};

export const createCars = (carData, CarClass) => {
  return carData.map((data) => new CarClass(data));
};

export const executeLap = (cars) => {
  cars.forEach((car) => {
    const randomNumber = getRandomNumber(RANDOM_MIN, RANDOM_MAX);
    car.move(randomNumber);
    console.log(`${car.name} / ${car.position}`);
  });
};
