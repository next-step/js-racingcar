import { Car, validateName } from './Car.js';

const cars = (function () {
  let carList;

  function generateCars(carNameList) {
    carList = carNameList.map(
      (carName, index) => new Car({ name: carName, line: `car-line-${index}` })
    );
  }

  function validateNames(carNameList) {
    carNameList.forEach((carName) => validateName(carName));
  }

  function readyCars(carNameList) {
    validateNames(carNameList);
    generateCars(carNameList);
  }

  function initialize() {
    carList = null;
  }

  function winner() {
    carList.sort(
      (prevCar, nextCar) => nextCar.movingDistance - prevCar.movingDistance
    );
    const [firstRankCar] = carList;
    return carList
      .filter((car) => car.movingDistance >= firstRankCar.movingDistance)
      .map((car) => car.name)
      .join(',');
  }

  return {
    readyCars,
    carList: () => carList,
    winner,
    initialize,
  };
})();
export default cars;
