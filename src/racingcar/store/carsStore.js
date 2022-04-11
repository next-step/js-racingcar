import Car from '../models/Car';
import { randomNumber } from '../../utils/randoms';

const carsStore = {
  cars: [],
  car_names: [],
  tryCounts: 0,
  winners: [],
  GET_CARS() {
    return this.cars;
  },
  SET_CARS() {
    this.cars = this.GET_CAR_NAMES().map((name) => new Car(name));
  },
  GET_CAR_NAMES() {
    return this.car_names;
  },
  SET_CAR_NAMES(_car_names) {
    return (this.car_names = _car_names);
  },
  GET_TRY_COUNTS() {
    return Number(this.tryCounts);
  },
  SET_TRY_COUNTS(_tryCounts) {
    this.tryCounts = _tryCounts;
  },
  GET_WINNERS() {
    return this.winners;
  },
  FIND_AND_SET_WINNERS() {
    this.winners = carsStore
      .GET_CARS()
      .filter((car) => car.moved === this.GET_TRY_COUNTS());
  },
  MOVE_CARS() {
    return this.GET_CARS().forEach((car) => car.move(randomNumber()));
  },
};

export default carsStore;
