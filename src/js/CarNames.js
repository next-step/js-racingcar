import CarName from './CarName.js';

class CarNames {
  static validate(carNameList) {
    carNameList.map((name) => new CarName(name).value);
  }
}
export default CarNames;
