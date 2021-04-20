import Car from "../domain/Car.js";

const game = (() => {
  const state = {
    cars: [],
    racingTimes: 0,
  };
  const subscriber = {};

  const resetCars = () => {
    state.cars = [];
  };

  const addCar = (name) => {
    state.cars.push(new Car(name));
    publish("cars");
  };

  const getCars = () => {
    return state.cars;
  };

  const inputRacingTimes = (racingTimes) => {
    state.racingTimes = racingTimes;
  };

  const setLoading = (value) => {
    state.cars.forEach((car) => car.setLoading(value));
    publish("cars");
  };

  const subscribe = (target, method) => {
    if (!subscriber[target]) {
      subscriber[target] = [];
    }
    subscriber[target].push(method);
  };

  const publish = (target) => {
    if (!subscriber[target]) {
      return;
    }

    subscriber[target].forEach((method) => method());
  };

  return {
    resetCars,
    addCar,
    getCars,
    inputRacingTimes,
    setLoading,
    subscribe,
  };
})();

export default game;
