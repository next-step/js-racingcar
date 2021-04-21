import Car from "../domain/Car.js";

const game = (() => {
  const state = {
    cars: [],
    racingTimes: 0,
    winners: [],
  };
  const subscriber = {};

  const resetCars = () => {
    state.cars = [];
    publish("cars");
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

  const raceAll = () => {
    state.cars.forEach((car) => car.race());
    publish("cars");
  };

  const determineWinner = () => {
    const winnerPosition = Math.max(...state.cars.map((car) => car.position));
    state.winners = state.cars.filter((car) => car.position === winnerPosition);
    publish("winner");
  };

  const getWinnerNames = () => {
    return state.winners.map((car) => car.name);
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
    raceAll,
    determineWinner,
    getWinnerNames,
    subscribe,
  };
})();

export default game;
