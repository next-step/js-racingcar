import { NotAllowedError } from "../utils/error.js";

class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(
      (subscriber) => subscriber !== observer
    );
  }

  dispatch(type) {
    if (this.observers.length === 0) {
      throw new NotAllowedError("옵저버가 존재하지 않습니다.");
    }
    this.observers.forEach((observer) => observer.action(type));
  }
}

export default Observable;
