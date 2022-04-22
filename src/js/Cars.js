import { Car } from './Car.js';

class ICars {
  #cars;

  readyCars(carNameList) {
    this.#cars = carNameList.map(
      (carName, index) => new Car({ name: carName, line: `car-line-${index}` })
    );
  }

  initialize() {
    this.#cars = null;
  }

  get carList() {
    return this.#cars;
  }

  get winner() {
    this.carList.sort(
      (prevCar, nextCar) => nextCar.movingDistance - prevCar.movingDistance
    );
    const [firstRankCar] = this.carList;
    return this.carList
      .filter((car) => car.movingDistance >= firstRankCar.movingDistance)
      .map((car) => car.name)
      .join(',');
  }
}
const Cars = new ICars();
Object.freeze(Cars);
export default Cars;
