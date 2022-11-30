export default class RacingCar {
 #position;
 constructor(name) {
  this.validateCarName(name);
  this.name = name;
  this.#position = 0;
 }
 /**
  *
  * @returns {number}
  */
 #getRandomNumber(limit = 10) {
  return Math.floor(Math.random() * limit);
 }

 validateCarName(carName) {
  if (carName.length < 1 || carName.length > 5) {
   throw new Error(
    '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
   );
  }
 }

 isMove() {
  const moveLimit = 4;
  if (this.#getRandomNumber() >= moveLimit) return true;
  return false;
 }
 move() {
  return new Promise((resolve, reject) => {
   setTimeout(() => {
    if (this.isMove()) {
     this.#position++;
    }
    resolve(this.#position);
   }, 1000);
  });
 }

 getPosition() {
  return this.#position;
 }
}
