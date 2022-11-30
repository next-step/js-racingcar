import RacingCar from '../Service/RacingCar';

export default class RaceModel {
 #cars;
 constructor() {
  this.#cars = [];
  this.tryCount = 0;
 }
 /**
  * setCarNames
  * @param {string[]} cars
  */
 setCarNames(cars) {
  this.#cars = cars.map((car) => new RacingCar(car));
 }

 async play(tryCount) {
  this.tryCount = tryCount;
  // promise
  while (tryCount--) {
   await Promise.all(this.#cars.map((car) => car.move())).then((positions) => {
    console.log(positions);
   });
  }
 }
}
