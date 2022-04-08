import Car from '../models/Car';

const carsStore = {
  car_names: [],
  cars: [],
  tryCounts: 0,
  winners: [],
  GET_CAR_NAMES: () => carsStore.car_names,
  SET_CAR_NAMES: (_car_names) => (carsStore.car_names = _car_names),
  GET_CARS: () => carsStore.cars,
  SET_CARS: (_car_names) => (carsStore.cars = _car_names.map((name) => new Car(name))),
  MOVE_CARS: () => carsStore.GET_CARS().forEach((car) => car.move()),
  GET_WINNERS: () => carsStore.winners,
  FIND_AND_SET_WINNERS: () =>
    (carsStore.winners = carsStore
      .GET_CARS()
      .filter((car) => car.moved === carsStore.GET_TRY_COUNTS())),
  GET_TRY_COUNTS: () => +carsStore.tryCounts,
  SET_TRY_COUNTS: (_tryCounts) => (carsStore.tryCounts = _tryCounts),
};

export default carsStore;
