import RacingCar from './RacingCar.js';
import { $ } from '../utils/helpers.js';

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

const track = (name, id) => {
  return `
        <div class="mr-2" data-car=${id}>
          <div class="car-player">${name}</div>
        </div>
        `;
};


export default function RacingCars(racingTrack, names) {
  this.names = names;
  this.racingTrack = racingTrack;
  this.cars = [];

  names.map((name, index) => this.cars.push(new RacingCar(name, index)));

  this.ready = () => {
    this.cars.map((car) => {
      const track = document.createElement('div');
      track.className = 'mr-2';
      track.dataset.car = car.id;
      track.innerHTML = `<div class="car-player">${car.name}</div>`;
      this.racingTrack.insertAdjacentElement('beforeend', track);
      car.ready(track);
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
