export class Subject {
  constructor(initalState) {
    this.observers = [];
    this.state = initalState;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers.splice(this.observers.indexOf(observer), 1);
  }

  notifyAll(newState) {
    this.state = newState;
    this.observers.forEach((observer) => observer.notify(newState));
  }
}
