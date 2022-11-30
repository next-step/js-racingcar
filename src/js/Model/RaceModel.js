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
 #validateTryCount(tryCount) {
  if (tryCount < 1) {
   throw new Error(
    '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.'
   );
  }
 }

 async play(tryCount) {
  this.#validateTryCount(tryCount);

  this.tryCount = tryCount;
  // promise
  while (tryCount--) {
   await Promise.all(this.#cars.map((car) => car.move())).then((positions) => {
    console.log(positions);
   });
  }
 }
}
