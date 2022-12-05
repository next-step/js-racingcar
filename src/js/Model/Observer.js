export default class Observer {
 #observers;
 constructor() {
  this.#observers = new Set();
 }
 subscribe(observer) {
  this.#observers.add(observer);
 }
 notify() {
  this.#observers.forEach((observer) => observer());
 }
}
