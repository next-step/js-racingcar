import Car from './Car.js';

class CarManager {
  constructor() {}

  createCars(carNames) {
    return carNames.map((carName) => new Car(carName.trim()));
  }

  forwardCars({ cars, count }) {
    cars.forEach((car) => car.forwardCar(count));
  }

  getWinners(cars) {
    const maxDistance = Math.max(...cars.map((car) => car.processCount));
    return cars.filter((car) => car.processCount === maxDistance).map((car) => car.name);
  }
}

export default CarManager;
