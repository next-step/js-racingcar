import RacingCar from '../Service/RacingCar';
import Observer from './Observer';

export default class RaceModel extends Observer {
 #cars;
 #tryCount;
 constructor() {
  super();
  this.#cars = [];
  this.#tryCount = 0;
 }
 /**
  * 참가하는 차들의 이름을 추가합니다.
  * @param {string[]} cars
  */
 setCarNames(cars) {
  this.#cars = cars.map((car) => new RacingCar(car.trim()));
 }

 /**
  * @param {number} tryCount
  */
 #validateTryCount(tryCount) {
  if (tryCount < 1) {
   throw new Error(
    '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.'
   );
  }
 }

 /**
  * @returns {[string,number][]}
  */
 getCarsPosition() {
  return this.#cars.map((car) => [car.getName(), car.getPosition()]);
 }
 /**
  * 경기가 끝났는지 아닌지를 반환합니다.
  * @returns {boolean}
  */
 isFinished() {
  return this.#tryCount <= 0;
 }

 /**
  * @param {number} tryCount
  */
 async play(tryCount) {
  this.#validateTryCount(tryCount);

  this.#tryCount = tryCount;
  while (this.#tryCount--) {
   this.notify();
   await Promise.all(this.#cars.map((car) => car.move()));
  }
 }
}
