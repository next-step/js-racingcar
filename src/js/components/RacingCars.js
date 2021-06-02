import RacingCar from './RacingCar.js';

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

export default function RacingCars(names) {
  this.names = names;
  this.cars = [];
  names.map((name) => this.cars.push(new RacingCar(name)));

  this.ready = (racingTrack) => {
    this.cars.map((car) => {
      car.ready(racingTrack);
      // racingTrack.insertAdjacentHTML('beforeend', car.ready());
      // car.setTrack();
    });
  };

  this.goRound = () => this.cars.map((car) => car.goRound());

  this.gameEnd = () => this.cars.map((car) => car.end());

  this.getWinner = () => {
    const carsDistance = this.cars.map((car) => car.getDistance());
    const indexes = getAllIndexes(
      carsDistance,
      Math.max.apply(null, carsDistance)
    );
    const winners = indexes.map((index) => this.cars[index].getName());
    return winners;
  };

  this.reset = () => {
    this.cars.map((car) => car.reset());
  };
}
