import { CarIO } from './view/CarIO';

const cario = CarIO();

cario.inputCars();

const cars = cario.getCars();

if (cario.checkCarValidate) {
  cars.split(',').map((car) => {});
}
