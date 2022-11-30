export default class RacingCar {
 #position;
 constructor(name) {
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
