import RacingCar from './RacingCar.js';

const maxValueIndexes = (arr) => {
  const max = Math.max.apply(null, arr);
  const indexes = [];
  arr.forEach((val, index) => {
    if (val === max) indexes.push(index);
  });
  return indexes;
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
      track.dataset.test = 'car-track';
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
    const indexes = maxValueIndexes(carsDistance);
    return indexes.map((index) => this.cars[index].getName());
  };

  this.reset = () => {
    this.cars.map((car) => car.reset());
  };
}
